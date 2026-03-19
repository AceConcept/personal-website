export interface SubTitleProps {
  /** The heading text */
  children: React.ReactNode;
  /** Optional text below the title (same style as TitleDescription right subtitle) */
  subtitleText?: React.ReactNode;
  /** When true, subtitleText is shown. Default false so subtitle is hidden by default. */
  showSubtitle?: boolean;
  /** Optional className for the wrapper */
  className?: string;
}

export default function SubTitle({
  children,
  subtitleText,
  showSubtitle = false,
  className = "",
}: SubTitleProps) {
  const hasSubtitle = showSubtitle && subtitleText != null;

  return (
    <div className={`portfolio-subtitle-block ${className}`.trim()}>
      <h3 className="portfolio-subtitle-heading">{children}</h3>
      {hasSubtitle && (
        <p className="portfolio-subtitle-text">{subtitleText}</p>
      )}
      <div
        className={
          hasSubtitle
            ? "portfolio-subtitle-divider portfolio-subtitle-divider--with-subtitle"
            : "portfolio-subtitle-divider portfolio-subtitle-divider--no-subtitle"
        }
      />
    </div>
  );
}
