#!/usr/bin/env python3
"""Disposable, real WordPress REST permission tests. Requires Docker Compose.

Uses only an isolated localhost installation; never reads production credentials.
All generated passwords stay in memory or a private temporary directory.
"""
import base64
import json
import ipaddress
import os
from pathlib import Path
import secrets
import subprocess
import tempfile
import time
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
PROJECT = "yb-api-test-" + secrets.token_hex(5)
COMPOSE = """
services:
  db:
    image: mariadb:11.4
    environment:
      MARIADB_DATABASE: wordpress
      MARIADB_USER: wordpress
      MARIADB_PASSWORD: ${TEST_DB_PASSWORD}
      MARIADB_ROOT_PASSWORD: ${TEST_DB_ROOT_PASSWORD}
    volumes: [db:/var/lib/mysql]
    healthcheck:
      test: [CMD, healthcheck.sh, --connect, --innodb_initialized]
      interval: 2s
      timeout: 5s
      retries: 60
  wordpress:
    image: wordpress:7.1.5-php8.3-apache
    depends_on:
      db: {condition: service_healthy}
    ports: ['127.0.0.1::80']
    environment: &wp_env
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: ${TEST_DB_PASSWORD}
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_CONFIG_EXTRA: |
        define('WP_ENVIRONMENT_TYPE', 'local');
        define('DISABLE_WP_CRON', true);
        define('AUTOMATIC_UPDATER_DISABLED', true);
    volumes:
      - wp:/var/www/html
      - ${TEST_PLUGIN}:/var/www/html/wp-content/plugins/yottabyte-corporate-blog:ro
      - ${TEST_MU}:/var/www/html/wp-content/mu-plugins:ro
  cli:
    image: wordpress:cli-php8.3
    user: '33:33'
    working_dir: /var/www/html
    profiles: [tools]
    environment:
      <<: *wp_env
      WP_CLI_CACHE_DIR: /tmp/wp-cli-cache
    volumes:
      - wp:/var/www/html
      - ${TEST_PLUGIN}:/var/www/html/wp-content/plugins/yottabyte-corporate-blog:ro
      - ${TEST_MU}:/var/www/html/wp-content/mu-plugins:ro
volumes:
  db:
  wp:
networks:
  default:
    ipam:
      config:
        - subnet: ${TEST_SUBNET}
"""


def main():
    count = 0
    with tempfile.TemporaryDirectory(prefix=PROJECT + "-") as temp:
        path = Path(temp)
        (path / "mu").mkdir()
        (path / "mu/no-outbound.php").write_text(
            "<?php add_filter('pre_http_request', static function() { return new WP_Error('test_no_outbound', 'Local test'); }, 999);"
        )
        config = path / "compose.yaml"
        config.write_text(COMPOSE)
        config.chmod(0o600)
        env = dict(os.environ, TEST_DB_PASSWORD=secrets.token_hex(20),
                   TEST_DB_ROOT_PASSWORD=secrets.token_hex(20),
                   TEST_PLUGIN=str(ROOT / "wordpress-plugin/yottabyte-corporate-blog"),
                   TEST_MU=str(path / "mu"))
        ids = subprocess.check_output(["docker", "network", "ls", "-q"], text=True).split()
        networks = json.loads(subprocess.check_output(["docker", "network", "inspect", *ids], text=True))
        used = [ipaddress.ip_network(c["Subnet"]) for n in networks for c in (n.get("IPAM", {}).get("Config") or []) if c.get("Subnet")]
        candidates = [ipaddress.ip_network(f"10.253.{i}.0/28") for i in range(1, 255)]
        env["TEST_SUBNET"] = str(next(c for c in candidates if not any(c.version == u.version and c.overlaps(u) for u in used)))
        compose = ["docker", "compose", "-p", PROJECT, "-f", str(config)]

        def run(args, *, input=None):
            result = subprocess.run(compose + args, env=env, input=input, text=True,
                                    capture_output=True)
            if result.returncode:
                safe_error = result.stderr[-1800:]
                for key in ("TEST_DB_PASSWORD", "TEST_DB_ROOT_PASSWORD"):
                    safe_error = safe_error.replace(env[key], "[redacted]")
                for arg in args:
                    if arg.startswith("--admin_password="):
                        safe_error = safe_error.replace(arg.split("=", 1)[1], "[redacted]")
                raise RuntimeError("Docker operation failed: " + " ".join(args[:3]) + "\n" + safe_error)
            return result.stdout.strip()

        def cli(*args):
            return run(["run", "--rm", "-T", "cli", "wp", *args])

        try:
            print("Starting isolated WordPress and MariaDB...", flush=True)
            run(["up", "-d", "--wait", "db", "wordpress"])
            port = run(["port", "wordpress", "80"]).rsplit(":", 1)[1]
            origin = "http://127.0.0.1:" + port
            # Wait for the official entrypoint to finish copying WordPress.
            for _ in range(30):
                try:
                    cli("core", "version")
                    break
                except RuntimeError as error:
                    if _ == 0:
                        print(str(error), flush=True)
                    time.sleep(1)
            print("Installing disposable WordPress...", flush=True)
            admin_pass = secrets.token_urlsafe(24)
            cli("core", "install", "--url=http://cms.yottabyte.jp", "--title=Disposable API test",
                "--admin_user=test_admin", "--admin_email=admin@example.invalid",
                "--admin_password=" + admin_pass, "--skip-email")
            cli("rewrite", "structure", "/%postname%/")
            cli("plugin", "activate", "yottabyte-corporate-blog")
            fixture = cli("eval", r'''
                $out = array();
                foreach (array('test_admin' => 'administrator', 'test_writer' => 'yb_blog_publisher', 'other_writer' => 'yb_blog_publisher') as $login => $role) {
                    $id = username_exists($login);
                    if (!$id) { $id = wp_insert_user(array('user_login'=>$login, 'user_pass'=>wp_generate_password(40), 'user_email'=>$login.'@example.invalid', 'role'=>$role)); }
                    $password = WP_Application_Passwords::create_new_application_password($id, array('name'=>'Disposable local REST test'));
                    $out[$login] = array('id'=>$id, 'password'=>$password[0]);
                }
                echo wp_json_encode($out);
            ''')
            users = json.loads(fixture)

            def api(method, route, payload=None, user="test_writer", raw=None, mime=None):
                headers = {"Host": "cms.yottabyte.jp"}
                if user:
                    pair = user + ":" + users[user]["password"]
                    headers["Authorization"] = "Basic " + base64.b64encode(pair.encode()).decode()
                data = None
                if payload is not None:
                    data = json.dumps(payload).encode()
                    headers["Content-Type"] = "application/json"
                if raw is not None:
                    data = raw
                    headers.update({"Content-Type": mime, "Content-Disposition": 'attachment; filename="test.' + ("png" if mime == "image/png" else "pdf") + '"'})
                req = urllib.request.Request(origin + "/wp-json" + route, data=data, method=method, headers=headers)
                try:
                    with urllib.request.urlopen(req, timeout=30) as response:
                        return response.status, json.load(response)
                except urllib.error.HTTPError as error:
                    return error.code, json.loads(error.read())

            def check(label, status, response, allowed):
                nonlocal count
                if status not in allowed:
                    code = response.get("code", "unknown") if isinstance(response, dict) else "unexpected"
                    raise AssertionError(f"{label}: HTTP {status}, code={code}")
                count += 1
                print("PASS " + label, flush=True)
                return response

            def call(label, method, route, allowed, **kwargs):
                status, result = api(method, route, **kwargs)
                return check(label, status, result, allowed)

            call("anonymous write blocked", "POST", "/wp/v2/yottabyte-articles", [401, 403], payload={"title":"No"}, user=None)
            call("anonymous status blocked", "GET", "/yottabyte/v1/publication-status", [401, 403], user=None)
            call("application password authentication", "GET", "/wp/v2/users/me", [200])
            terms = call("fixed categories readable", "GET", "/wp/v2/yb_category", [200])
            assert len(terms) == 4
            category = next(t["id"] for t in terms if t["slug"] == "ai")
            draft = call("create own HP draft", "POST", "/wp/v2/yottabyte-articles", [201], payload={"title":"API test", "slug":"api-local-test", "content":"<p>Local only.</p>", "yb_category":[category], "status":"draft"})
            article = "/wp/v2/yottabyte-articles/" + str(draft["id"])
            feed = call("draft excluded from public feed", "GET", "/yottabyte/v1/articles", [200], user=None)
            assert not feed["items"]
            png = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aD1sAAAAASUVORK5CYII=")
            image = call("upload own PNG", "POST", "/wp/v2/media", [201], raw=png, mime="image/png")
            media = "/wp/v2/media/" + str(image["id"])
            call("edit own image metadata", "POST", media, [200], payload={"alt_text":"Test image", "post":draft["id"]})
            call("publish own HP article", "POST", article, [200], payload={"status":"publish", "featured_media":image["id"]})
            feed = call("published article in public feed", "GET", "/yottabyte/v1/articles", [200], user=None)
            assert feed["items"][0]["category"] == "ai"
            call("update own published article", "POST", article, [200], payload={"excerpt":"Updated"})
            call("publication status readable", "GET", "/yottabyte/v1/publication-status", [200])
            other = call("other author fixture", "POST", "/wp/v2/yottabyte-articles", [201], user="other_writer", payload={"title":"Other", "status":"draft"})
            call("cannot edit another author", "POST", "/wp/v2/yottabyte-articles/" + str(other["id"]), [403], payload={"title":"Denied"})
            other_image = call("other image fixture", "POST", "/wp/v2/media", [201], user="other_writer", raw=png, mime="image/png")
            call("cannot read another image", "GET", "/wp/v2/media/" + str(other_image["id"]), [403])
            call("cannot use another thumbnail", "POST", article, [403], payload={"featured_media":other_image["id"]})
            listed = call("media list scoped to owner", "GET", "/wp/v2/media", [200])
            assert all(x["author"] == users["test_writer"]["id"] for x in listed)
            for route in ["/wp/v2/posts", "/wp/v2/pages", "/wp/v2/settings", "/wp/v2/users", "/wp/v2/plugins", "/wp/v2/yb_category", "/wp/v2/users/me/application-passwords"]:
                call("blocked write " + route, "POST", route, [403], payload={"title":"Denied"})
            call("cannot delete article", "DELETE", article + "?force=true", [403])
            call("non-image upload blocked", "POST", "/wp/v2/media", [400, 403, 500], raw=b"%PDF-1.4 local test", mime="application/pdf")
            for label, data in [("external image rejected", {"content":'<p>Test</p><img src="https://example.com/x.png">'}),
                                ("reserved slug rejected", {"slug":"category"}),
                                ("empty body rejected", {"content":""}),
                                ("long title rejected", {"title":"a" * 301}),
                                ("long excerpt rejected", {"excerpt":"a" * 1001}),
                                ("scheduled bypass rejected", {"status":"future", "date":"2030-01-01T12:00:00"}),
                                ("password-protected bypass rejected", {"password":"local-non-secret-fixture"})]:
                call(label, "POST", article, [422], payload=data)
            call("administrator keeps regular post access", "POST", "/wp/v2/posts", [201], user="test_admin", payload={"title":"Admin only", "status":"draft"})
            call("administrator keeps HP access", "POST", "/wp/v2/yottabyte-articles", [201], user="test_admin", payload={"title":"Admin HP", "status":"draft"})
            print(json.dumps({"passed":count, "production_requests":0, "project":PROJECT}))
        finally:
            run(["down", "--volumes", "--remove-orphans"])
            print("Removed disposable test containers, network and volumes.", flush=True)


if __name__ == "__main__":
    main()
