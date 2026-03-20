"use client";

import { useState } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const DEFAULT_RIGHT_PREVIEW_LENGTH = 150;

export interface TitleDescriptionProps {
  title: string;
  /**
   * Optional simple description (fallback when no left/right subtitles are provided).
   */
  description?: string;
  /**
   * Optional breadcrumb items rendered above the title.
   */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * Left subtitle text (typically the shorter summary on the left column).
   */
  leftSubtitle?: string;
  /**
   * Right subtitle text (typically the longer copy on the right column).
   * When longer than rightSubtitlePreviewLength, a "+ read more" control expands/collapses the text.
   */
  rightSubtitle?: string;
  /**
   * Character count to show when right subtitle is collapsed. Omit or 0 to show full text (no read more).
   */
  rightSubtitlePreviewLength?: number;
  /** Optional className for the wrapper */
  className?: string;
}
export default function TitleDescription({
  title,
  description,
  breadcrumbs,
  leftSubtitle,
  rightSubtitle,
  rightSubtitlePreviewLength = DEFAULT_RIGHT_PREVIEW_LENGTH,
  className = "",
}: TitleDescriptionProps) {
  const [rightExpanded, setRightExpanded] = useState(false);
  const hasTwoColumnSubtitles = leftSubtitle || rightSubtitle;
  const rightIsExpandable =
    rightSubtitle != null &&
    rightSubtitlePreviewLength > 0 &&
    rightSubtitle.length > rightSubtitlePreviewLength;

  return (
    <section
      className={`portfolio-title-block ${className}`.trim()}
      aria-labelledby="title-desc-title"
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          className="portfolio-breadcrumbs"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isLink = Boolean(crumb.href);
            const resolvedHref = (() => {
              if (!crumb.href) return undefined;

              // Breadcrumbs across the site should jump back to the corresponding
              // section on the homepage, where the Gallery/Design/Development
              // menu + smooth scroll is handled.
              if (crumb.href === "/work" || crumb.href.startsWith("/work/")) {
                return "/#design";
              }

              if (
                crumb.href === "/design-gallery" ||
                crumb.href.startsWith("/design-gallery/")
              ) {
                return "/#gallery";
              }

              if (crumb.href === "/dev-projects" || crumb.href.startsWith("/dev-projects/")) {
                return "/#dev-projects";
              }

              return crumb.href;
            })();
            const content = isLink ? (
              <a
                href={resolvedHref}
                className={
                  isLast
                    ? "portfolio-breadcrumbs__link portfolio-breadcrumbs__link--current"
                    : "portfolio-breadcrumbs__link"
                }
              >
                {crumb.label}
              </a>
            ) : (
              <span
                className={
                  isLast
                    ? "portfolio-breadcrumbs__item portfolio-breadcrumbs__item--current"
                    : "portfolio-breadcrumbs__item"
                }
              >
                {crumb.label}
              </span>
            );

            return (
              <span key={`${crumb.label}-${index}`} className="portfolio-breadcrumbs__segment">
                {content}
                {!isLast && <span className="portfolio-breadcrumbs__separator">/</span>}
              </span>
            );
          })}
        </nav>
      )}

      <h2 id="title-desc-title" className="portfolio-title">
        {title}
      </h2>

      {hasTwoColumnSubtitles ? (
        <div className="portfolio-subtitle-row">
          {leftSubtitle && (
            <p className="portfolio-subtitle-left">
              {leftSubtitle}
            </p>
          )}
          {rightSubtitle && (
            <div className="portfolio-subtitle-right-wrap">
              {rightIsExpandable ? (
                <>
                  <div
                    className={`portfolio-subtitle-right-expandable ${rightExpanded ? "portfolio-subtitle-right-expandable--open" : ""}`}
                  >
                    <p className="portfolio-subtitle-right">
                      {rightSubtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="portfolio-read-more"
                    onClick={() => setRightExpanded((e) => !e)}
                    aria-expanded={rightExpanded}
                  >
                    {rightExpanded ? "− read less" : "+ read more"}
                  </button>
                </>
              ) : (
                <p className="portfolio-subtitle-right">
                  {rightSubtitle}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        description && (
          <p className="portfolio-description">
            {description}
          </p>
        )
      )}
    </section>
  );
}
