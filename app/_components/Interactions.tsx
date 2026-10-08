'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { faqs, company } from '@/app/_data/site';
import { trackContactSubmission } from '@/app/_lib/analytics';
import type { FormEvent } from 'react';
export function RevealController() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible');
    });
    document.body.classList.add('motion-enabled');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      document.body.classList.remove('motion-enabled');
    };
  }, [pathname]);
  return null;
}
export function FAQ() {
  return (
    <div className="faq-list">
      {faqs.map(([question, answer]) => (
        <details key={question}>
          <summary>
            <span className="faq-q">Q</span>
            <span>{question}</span>
            <span className="faq-toggle" aria-hidden="true">
              ↑
            </span>
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
export function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(false);
  const lastRequest = useRef<{ payload: string; id: string } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const data = new FormData(event.currentTarget);
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    if (!endpoint) {
      setError(`現在フォームをご利用いただけません。${company.email}へご連絡ください。`);
      return;
    }
    const payload = {
      topic: data.get('topic'),
      organization: data.get('organization'),
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone') || '',
      message: data.get('message'),
      consent: data.get('consent') === 'on',
      website: data.get('website') || '',
    };
    const fingerprint = JSON.stringify(payload);
    if (lastRequest.current?.payload !== fingerprint) {
      lastRequest.current = { payload: fingerprint, id: crypto.randomUUID() };
    }
    pending.current = true;
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, requestId: lastRequest.current.id }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true || typeof result?.id !== 'string') {
        setError(
          typeof result?.error === 'string'
            ? result.error
            : '送信を完了できませんでした。入力内容を確認し、再度お試しください。',
        );
        return;
      }
      trackContactSubmission();
      router.push('/contact-thanks/');
    } catch {
      setError('送信結果を確認できませんでした。入力内容を変えずに再度お試しください。');
    } finally {
      pending.current = false;
      setIsSubmitting(false);
    }
  }
  return (
    <form id="form" className="contact-form" onSubmit={submit} aria-busy={isSubmitting}>
      <label className="form-honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <fieldset className="form-topic">
        <legend>
          お問い合わせ内容 <span className="required">*</span>
        </legend>
        {['システム開発・業務改善について', 'AI・技術設計について', '協業について', 'その他'].map(
          (topic, i) => (
            <label key={topic}>
              <input name="topic" value={topic} type="radio" required defaultChecked={i === 0} />
              {topic}
            </label>
          ),
        )}
      </fieldset>
      <label className="form-field">
        法人名・団体名 <span className="required">*</span>
        <input
          name="organization"
          placeholder="例）株式会社サンプル"
          required
          autoComplete="organization"
          maxLength={120}
        />
      </label>
      <label className="form-field">
        お名前 <span className="required">*</span>
        <input name="name" placeholder="例）山田太郎" required autoComplete="name" maxLength={80} />
      </label>
      <label className="form-field">
        ご連絡先メールアドレス <span className="required">*</span>
        <input
          name="email"
          type="email"
          placeholder="例）info@sample.co.jp"
          required
          autoComplete="email"
          maxLength={160}
        />
      </label>
      <label className="form-field">
        ご連絡先電話番号
        <input
          name="phone"
          type="tel"
          placeholder="例）09012345678"
          autoComplete="tel"
          maxLength={40}
        />
      </label>
      <label className="form-field">
        お問い合わせ詳細 <span className="required">*</span>
        <textarea
          name="message"
          placeholder="ご相談内容をご記入ください"
          required
          maxLength={3000}
        />
      </label>
      <label className="form-consent">
        <input type="checkbox" name="consent" required />
        <span>
          <a href="/privacypolicy/" target="_blank" rel="noopener noreferrer">
            個人情報の取り扱い
          </a>
          を確認し、同意しました
        </span>
      </label>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? '送信中…' : '送信する'}
      </button>
    </form>
  );
}
