import styles from "./HeroReels.module.css";
import { reelColumn1, reelColumn2 } from "@/app/lib/reel-data";

function ReelColumn({
  items,
  columnIndex,
}: {
  items: { src: string; href: string }[];
  columnIndex: 1 | 2;
}) {
  const duration = columnIndex === 1 ? 30 : 35;
  return (
    <div className={styles.column} aria-hidden>
      <div
        className={styles.track}
        style={{ "--reel-duration": `${duration}s` } as React.CSSProperties}
      >
        {/* Two identical groups for seamless loop; spacing via item padding */}
        <div className={styles.group}>
          {items.map(({ src, href }, i) => (
            <a key={`a-${i}`} href={href} className={styles.item}>
              <img src={src} alt="" width={224} height={169} />
            </a>
          ))}
        </div>
        <div className={styles.group}>
          {items.map(({ src, href }, i) => (
            <a key={`b-${i}`} href={href} className={styles.item}>
              <img src={src} alt="" width={224} height={169} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroReels() {
  return (
    <div className={styles.reels}>
      <ReelColumn items={reelColumn1} columnIndex={1} />
      <ReelColumn items={reelColumn2} columnIndex={2} />
    </div>
  );
}
