type TechnologyKind = 'development' | 'automation' | 'ai';

/** Service diagrams are illustrative, not screenshots or customer achievements. */
export function TechnologyVisual({
  kind,
  className = '',
}: {
  kind: TechnologyKind;
  className?: string;
}) {
  return (
    <div className={`technology-visual technology-visual--${kind} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 480 280" fill="none">
        {kind === 'development' ? (
          <>
            <rect
              x="54"
              y="40"
              width="310"
              height="200"
              rx="8"
              fill="white"
              stroke="currentColor"
            />
            <path d="M54 73h310M87 56h3m11 0h3m11 0h3" stroke="currentColor" strokeWidth="3" />
            <rect x="76" y="97" width="66" height="119" rx="3" fill="currentColor" opacity=".09" />
            <path
              d="M164 108h82m-82 19h136m-136 19h106"
              stroke="currentColor"
              strokeWidth="7"
              opacity=".35"
            />
            <path
              d="m315 170-18 18 18 18m43-36 18 18-18 18m-20-27-9 36"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path d="M164 177h83v39h-83z" fill="currentColor" opacity=".12" />
            <path d="M393 65v42m-21-21h42M403 229h19" stroke="currentColor" strokeWidth="2" />
          </>
        ) : kind === 'automation' ? (
          <>
            <path
              d="M109 140h262M240 140v-62m0 124v-62"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5 6"
            />
            <rect x="48" y="108" width="87" height="64" rx="7" fill="white" stroke="currentColor" />
            <rect x="196" y="108" width="87" height="64" rx="7" fill="currentColor" />
            <rect
              x="345"
              y="108"
              width="87"
              height="64"
              rx="7"
              fill="white"
              stroke="currentColor"
            />
            <rect x="212" y="36" width="56" height="43" rx="6" fill="white" stroke="currentColor" />
            <rect
              x="212"
              y="202"
              width="56"
              height="43"
              rx="6"
              fill="white"
              stroke="currentColor"
            />
            <path
              d="M69 129h42m-42 11h30m-30 11h35m244-15 9 9 18-20"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path d="m227 140 9 9 18-20" stroke="white" strokeWidth="3" />
            <path d="M155 135l6 5-6 5m150-10 6 5-6 5" stroke="currentColor" strokeWidth="2" />
          </>
        ) : (
          <>
            <path
              d="M141 91h34l31 49m-65 50h34l31-50m65 0h47"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect x="54" y="55" width="86" height="72" rx="6" fill="white" stroke="currentColor" />
            <rect x="54" y="154" width="86" height="72" rx="6" fill="white" stroke="currentColor" />
            <path
              d="M74 77h43m-43 12h31m-31 12h38m-38 75h43m-43 12h31m-31 12h38"
              stroke="currentColor"
              opacity=".45"
              strokeWidth="3"
            />
            <circle cx="238" cy="140" r="49" fill="currentColor" />
            <path d="m238 112 7 21 21 7-21 7-7 21-7-21-21-7 21-7z" stroke="white" strokeWidth="2" />
            <rect
              x="326"
              y="97"
              width="103"
              height="86"
              rx="6"
              fill="white"
              stroke="currentColor"
            />
            <path
              d="M347 119h59m-59 14h44m-44 14h53m-53 14h31"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path d="m304 135 6 5-6 5" stroke="currentColor" strokeWidth="2" />
          </>
        )}
      </svg>
    </div>
  );
}

export function RegionalCoverage() {
  return (
    <section className="regional-section" aria-labelledby="regional-heading">
      <div className="container regional-grid" data-reveal>
        <div>
          <p className="eyebrow">BASED IN HAYAMA, SHONAN.</p>
          <h2 id="regional-heading" className="large-copy">
            この街の挑戦に、
            <br />
            技術で応える。
          </h2>
        </div>
        <div className="regional-content">
          <ul className="regional-cities" aria-label="拠点と主な対応エリア">
            <li>
              <span>HAYAMA</span>葉山<small>BASE</small>
            </li>
            <li>
              <span>ZUSHI</span>逗子
            </li>
            <li>
              <span>YOKOSUKA</span>横須賀
            </li>
          </ul>
          <p>
            葉山町を拠点に、逗子・横須賀・鎌倉など湘南・三浦半島の企業のご相談に対応します。
            社内情報を探せるAI、日々の転記を減らすシステム連携、新しいWebサービス。
            地域の事業の課題を、設計から実装・運用まで一緒に具体化します。
          </p>
        </div>
      </div>
    </section>
  );
}
