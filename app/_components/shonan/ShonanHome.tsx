import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { shonanFonts } from './typography';
import { ShonanFooter } from './ShonanFooter';
import { cases, news, services } from '@/app/_data/site';
import { CoastalExperience } from './CoastalExperience';
import { BusinessIllustration } from './BusinessIllustration';
import { caseArtwork } from './caseArtwork';
import { ActionLink, Arrow, MotionText, SectionTitle, TechObject, Stand } from './ReferenceParts';
import {
  StoryLandscape,
  ITPerson,
  PersonGround,
  ServiceSeal,
  SunsetBackdrop,
  CoastalRoad,
} from './ScrollScenery';
import styles from './shonan.module.css';

const areas = [
  { title: 'アイデアを形に', name: 'システム開発', href: '/service/development/' },
  { title: '情報をつなぐ', name: 'API・システム連携', href: '/solutions/#integration' },
  { title: '仕事を軽やかに', name: '業務改善・自動化', href: '/service/automation/' },
  { title: '可能性をひろげる', name: 'AI・LLM活用', href: '/service/ai/' },
  { title: '魅力を届ける', name: 'HP制作', href: '/service/website/' },
];

export default function ShonanHome() {
  return (
    <CoastalExperience fontClass={shonanFonts} footer={<ShonanFooter />}>
      <section id="about" className={styles.intro} aria-labelledby="intro-title">
        <div className={styles.introCopy}>
          <h2 id="intro-title">
            <span data-intro-heading>その仕事に、</span>
            <br />
            <span data-intro-heading>頼れる技術であるために</span>
          </h2>
          <p>
            ITは、ただ新しい技術を取り入れたり、
            <br />
            システムをつくるだけではありません。
            <br />
            本当に大切なのは、その事業で働く人たちの
            <br />
            目線に立って、日々の仕事を理解すること。
            <br />
            YottaByteは、状況や課題を一緒に整理し、
            <br />
            一緒に考え、一緒につくる。
            <br />
            いちばん身近な「技術のパートナー」で
            <br />
            ありたいと考えています。
          </p>
        </div>
      </section>
      <div className={styles.storyBody} data-story-body>
        <StoryLandscape />
        <div id="company-links" className={styles.squareLinks} data-intro-links>
          <Link href="/features/" className={styles.squareLink} data-intro-card>
            <MotionText text="特徴と強み" />
            <Arrow />
          </Link>
          <Link href="/company/" className={styles.squareLink} data-intro-card>
            <MotionText text="会社情報" />
            <Arrow />
          </Link>
          <div className={styles.introPersonOne} data-intro-person>
            <PersonGround />
            <ITPerson />
          </div>
          <div className={styles.introPersonTwo} data-intro-person>
            <PersonGround />
            <ITPerson pose="laptop" />
          </div>
          <div className={styles.introPersonThree} data-intro-person>
            <ITPerson pose="wave" />
          </div>
        </div>

        <section id="business" className={styles.business}>
          <SectionTitle jp="事業紹介" en="BUSINESS" />
          <div className={styles.businessSummary} data-business-summary>
            <p data-scroll-copy>
              構想から公開、その先の改善まで。
              <br />
              事業に合うシステムとWebサイトを、一緒につくります。
            </p>
            <div className={styles.seals}>
              <ServiceSeal>
                システム
                <br />
                AI開発
              </ServiceSeal>
              <ServiceSeal>
                HP
                <br />
                制作
              </ServiceSeal>
            </div>
          </div>
          <div id="business-scenes" className={styles.boards} data-business-area>
            <article className={styles.board} data-business-board>
              <div className={styles.boardFace} data-business-panel>
                <BusinessIllustration kind="development" />
                <p>
                  業務システムからAIを活用した機能まで。目的と現場に合わせて設計・開発し、運用・改善まで支えます。
                </p>
                <ActionLink href="/service/development/" text="システム・AI開発" />
              </div>
              <div className={styles.boardLegs} data-business-legs>
                <Stand className={styles.leg} />
                <Stand className={styles.leg} />
              </div>
            </article>
            <article className={styles.board} data-business-board>
              <div className={styles.boardFace} data-business-panel>
                <BusinessIllustration kind="website" />
                <p>
                  事業の魅力が伝わるホームページを制作。構成・デザインから実装、スマートフォン対応、公開後の改善まで支えます。
                </p>
                <ActionLink href="/service/website/" text="HP制作" />
              </div>
              <div className={styles.boardLegs} data-business-legs>
                <Stand className={styles.leg} />
                <Stand className={styles.leg} />
              </div>
            </article>
          </div>
        </section>
      </div>

      <section id="products" className={styles.products} data-support-scene>
        <SunsetBackdrop />
        <SectionTitle jp="事業を支えるITサービス" en="SOLUTIONS" />
        <p className={styles.solutionsIntro} data-scroll-copy>
          つくる、つなぐ、使い続ける。
          <br />
          課題に合わせて、必要な技術を組み合わせます。
        </p>
        <div className={styles.solutionMap} data-road-scene>
          <CoastalRoad />
          {areas.map((area, i) => (
            <div
              className={styles.solutionNode}
              key={area.name}
              data-solution-node
              style={{ '--sign': i, '--mobile-col': i % 2 } as CSSProperties}
            >
              <div className={styles.solutionSign} data-sign-panel>
                <span className={styles.signBack} aria-hidden="true" />
                <Link href={area.href} className={styles.oval}>
                  <span className={styles.signNumber}>0{i + 1}</span>
                  <h3>{area.title}</h3>
                  <TechObject kind={i === 4 ? 5 : i} />
                  <p>{area.name}</p>
                </Link>
              </div>
              <Stand className={styles.solutionLeg} />
            </div>
          ))}
          <ActionLink className={styles.solutionsCta} href="/solutions/" text="支援領域を見る" />
        </div>
      </section>

      <div className={styles.contentEnding} data-content-ending>
        <section id="works" className={styles.works}>
          <SectionTitle jp="対応事例" en="WORK" />
          <div className={styles.workRibbon} data-ribbon aria-label="対応事例の一覧">
            <div className={styles.workTrack}>
              {[0, 1].map((copy) => (
                <div
                  className={styles.workGroup}
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {cases.slice(0, 6).map((item) => (
                    <Link
                      href={`/case/${item.id}/`}
                      key={item.id}
                      className={styles.workCard}
                      tabIndex={copy === 1 ? -1 : undefined}
                    >
                      <div className={styles.workImage}>
                        <Image
                          src={caseArtwork(item).src}
                          alt={copy === 0 ? caseArtwork(item).alt : ''}
                          width={720}
                          height={480}
                          sizes="(max-width:967px) 70vw, 420px"
                        />
                        <span>{services.find((s) => s.id === item.category)?.title}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>代表者のプロジェクト経験</p>
                      <span className={styles.workArrow} aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <ActionLink href="/case/" text="対応事例一覧" />
        </section>
        <section id="news" className={styles.news}>
          <SectionTitle jp="お知らせ" en="NEWS" />
          <div className={styles.newsList}>
            {news.map((item) => (
              <Link href={`/news/${item.id}/`} className={styles.newsRow} key={item.id}>
                <time dateTime={item.date.replaceAll('.', '-')}>{item.date}</time>
                <span className={styles.newsBadge}>お知らせ</span>
                <span>{item.title}</span>
                <Arrow />
              </Link>
            ))}
            <Link href="/news/" className={styles.newsMore}>
              <MotionText text="お知らせ一覧" />
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </div>
    </CoastalExperience>
  );
}
