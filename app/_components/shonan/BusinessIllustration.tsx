import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import images from './business-images.json';
import {
  AIPanel,
  BrowserFrame,
  MobileWebsite,
  PeopleGround,
  SystemChart,
  SystemNavigation,
  SystemTable,
  WebsiteHero,
  WebsiteSections,
} from './BusinessScreens';
import styles from './shonan.module.css';

type Kind = 'development' | 'website';
type Actor = 'automation-instructor' | 'automation-analyst' | 'automation-colleagues';
type PartKind = 'frame' | 'interface' | 'person' | 'detail' | 'ground';

function Part({
  id,
  kind,
  x,
  y,
  width,
  height,
  z = 1,
  children,
}: {
  id: string;
  kind: PartKind;
  x: number;
  y: number;
  width: number;
  height: number;
  z?: number;
  children: ReactNode;
}) {
  return (
    <div
      className={styles.businessPart}
      data-business-part={kind}
      data-business-object={id}
      style={
        {
          left: `${(x / 1536) * 100}%`,
          top: `${(y / 1024) * 100}%`,
          width: `${(width / 1536) * 100}%`,
          height: `${(height / 1024) * 100}%`,
          zIndex: z,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

function Picture({ art }: { art: Actor }) {
  const size = images[art];
  return (
    <picture className={styles.businessPicture}>
      <source srcSet={`/illustrations/shonan-business/${art}.avif`} type="image/avif" />
      <Image
        src={`/illustrations/shonan-business/${art}.webp`}
        width={size.width}
        height={size.height}
        alt=""
        unoptimized
        loading="eager"
        draggable={false}
      />
    </picture>
  );
}

function ActorPart({
  art,
  id,
  x,
  y,
  width,
}: {
  art: Actor;
  id: string;
  x: number;
  y: number;
  width: number;
}) {
  return (
    <Part
      id={id}
      kind="person"
      x={x}
      y={y}
      width={width}
      height={(width * images[art].height) / images[art].width}
      z={3}
    >
      <Picture art={art} />
    </Part>
  );
}

function Interface({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div
      className={styles.businessOverlay}
      data-business-part="interface"
      data-business-object={id}
    >
      {children}
    </div>
  );
}

export function BusinessIllustration({ kind }: { kind: Kind }) {
  const development = kind === 'development';
  return (
    <div className={styles.businessScene} aria-hidden="true">
      <div className={styles.businessCanvas}>
        <Part id="people-ground" kind="ground" x={30} y={900} width={650} height={108} z={0}>
          <PeopleGround />
        </Part>
        <Part
          id={development ? 'system-browser' : 'website-browser'}
          kind="frame"
          x={420}
          y={15}
          width={1010}
          height={(1010 * 900) / 1040}
          z={1}
        >
          <BrowserFrame />
          {development ? (
            <>
              <Interface id="workspace-navigation">
                <SystemNavigation />
              </Interface>
              <Interface id="workspace-table">
                <SystemTable />
              </Interface>
              <Interface id="workspace-chart">
                <SystemChart />
              </Interface>
            </>
          ) : (
            <>
              <Interface id="website-hero">
                <WebsiteHero />
              </Interface>
              <Interface id="website-sections">
                <WebsiteSections />
              </Interface>
            </>
          )}
        </Part>
        {development ? (
          <>
            <ActorPart id="engineer" art="automation-instructor" x={70} y={410} width={260} />
            <ActorPart id="client" art="automation-analyst" x={330} y={430} width={195} />
            <Part id="ai-suggestions" kind="detail" x={1125} y={555} width={330} height={340} z={4}>
              <AIPanel />
            </Part>
          </>
        ) : (
          <>
            <ActorPart id="website-review" art="automation-colleagues" x={40} y={520} width={600} />
            <Part
              id="mobile-preview"
              kind="detail"
              x={1195}
              y={445}
              width={235}
              height={(235 * 510) / 260}
              z={4}
            >
              <MobileWebsite />
            </Part>
          </>
        )}
      </div>
    </div>
  );
}
