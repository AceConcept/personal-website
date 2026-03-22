"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./WebSiteSection.module.css";
import HeroReels from "./HeroReels";
import { galleryItems, designItems, developmentItems } from "@/app/lib/gallery-data";

type SectionTab = "gallery" | "design" | "development";

export default function WebSiteSection() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<SectionTab>("gallery");
  const [openTab, setOpenTab] = useState<SectionTab | null>(null);
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const menuNavRef = useRef<HTMLElement | null>(null);

  const tabItems = openTab === "gallery" ? galleryItems : openTab === "design" ? designItems : developmentItems;
  const openProject = openTab !== null && openProjectIndex !== null && tabItems[openProjectIndex] ? tabItems[openProjectIndex] : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const applyTabFromHash = useCallback(() => {
    if (typeof window === "undefined") return;
    const hash = (window.location.hash ?? "").replace("#", "");

    if (hash === "gallery") {
      setActiveTab("gallery");
      setOpenTab(null);
      setOpenProjectIndex(null);
      requestAnimationFrame(() => {
        menuNavRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    } else if (hash === "design") {
      setActiveTab("design");
      setOpenTab(null);
      setOpenProjectIndex(null);
      requestAnimationFrame(() => {
        menuNavRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    } else if (hash === "dev-projects" || hash === "development" || hash === "dev") {
      setActiveTab("development");
      setOpenTab(null);
      setOpenProjectIndex(null);
      requestAnimationFrame(() => {
        menuNavRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }, []);

  useEffect(() => {
    applyTabFromHash();

    // hashchange: same-page # changes
    // popstate: Back/Forward (e.g. from /design-gallery/roga → /#gallery) — hashchange often does NOT fire here
    window.addEventListener("hashchange", applyTabFromHash);
    window.addEventListener("popstate", applyTabFromHash);
    return () => {
      window.removeEventListener("hashchange", applyTabFromHash);
      window.removeEventListener("popstate", applyTabFromHash);
    };
  }, [applyTabFromHash]);

  useEffect(() => {
    if (pathname !== "/") return;
    // After client navigation back to home, URL + hash are updated; re-sync tab once Next has applied the location
    queueMicrotask(() => applyTabFromHash());
  }, [pathname, applyTabFromHash]);

  const overlayEl =
    openProject && mounted && typeof document !== "undefined" ? (
      <div
        className={styles.overlayBackdrop}
        onClick={() => { setOpenTab(null); setOpenProjectIndex(null); }}
        role="button"
        tabIndex={0}
        aria-label="Close overlay"
        onKeyDown={(e) => e.key === "Escape" && (setOpenTab(null), setOpenProjectIndex(null))}
      >
        <div
          className={styles.overlayContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.overlayInner}>
            {openProject.video ? (
              <video
                className={styles.overlayVideo}
                src={openProject.video}
                muted
                loop
                playsInline
                autoPlay
                controls
              />
            ) : (
              <img
                src={openProject.image}
                alt=""
                className={styles.overlayImage}
              />
            )}
          </div>
        </div>
      </div>
    ) : null;

  return (
    <section className={styles.section}>
      {/* Hero - two columns: title/subtitle left */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine}>Asar Morris</span>
            <span className={styles.heroLine}>Product Designer</span>
            <span className={styles.heroLine}>based in NYC</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A Product Designer based in New York City. Making useful things for the companies around the world.
          </p>
        </div>
        <div className={styles.heroRight}>
          <HeroReels />
        </div>
      </div>

      {/* Section menu – segmented control: Gallery / Design / Development */}
      <nav
        ref={menuNavRef}
        className={styles.sectionMenu}
        aria-label="Section menu"
      >
        <span className={styles.sectionMenuStripedBar} aria-hidden>
          <svg width="14" height="48" viewBox="0 0 14 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="7" height="48" fill="black"/>
            <rect x="11" width="3" height="48" fill="black"/>
          </svg>
        </span>
        <button
          type="button"
          className={styles.sectionMenuLink + (activeTab === "gallery" ? " " + styles.sectionMenuLinkActive : "") + " " + styles.sectionMenuLinkFirst}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery
        </button>
        <button
          type="button"
          className={styles.sectionMenuLink + (activeTab === "design" ? " " + styles.sectionMenuLinkActive : "")}
          onClick={() => setActiveTab("design")}
        >
          Design
        </button>
        <button
          type="button"
          className={styles.sectionMenuLink + (activeTab === "development" ? " " + styles.sectionMenuLinkActive : "") + " " + styles.sectionMenuLinkLast}
          onClick={() => setActiveTab("development")}
        >
          Development
        </button>
        <span className={styles.sectionMenuStripedBarRight} aria-hidden>
          <svg width="14" height="48" viewBox="0 0 14 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleX(-1)" }}>
            <rect width="7" height="48" fill="#E4E4E4"/>
            <rect x="11" width="3" height="48" fill="#E4E4E4"/>
          </svg>
        </span>
      </nav>

      {/* Content below menu – changes by active tab */}
      <div className={styles.sectionContent}>
        {activeTab === "gallery" && (
          <>
            <div className={styles.cardGrid}>
              {galleryItems.map((item, i) =>
                item.href ? (
                  <Link
                    key={i}
                    href={item.href}
                    className={styles.card}
                    aria-label={`${item.title}, ${item.meta}`}
                    {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.video ? (
                      <video
                        className={styles.cardMedia}
                        src={item.video}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="auto"
                        aria-hidden
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt=""
                        className={styles.cardImage}
                        width={800}
                        height={500}
                      />
                    )}
                    <div className={styles.cardCaption}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardMeta}>{item.meta}</p>
                    </div>
                  </Link>
                ) : (
                  <button
                    key={i}
                    type="button"
                    className={styles.card}
                    onClick={() => { setOpenTab("gallery"); setOpenProjectIndex(i); }}
                  >
                    {item.video ? (
                      <video
                        className={styles.cardMedia}
                        src={item.video}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="auto"
                        aria-hidden
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt=""
                        className={styles.cardImage}
                        width={800}
                        height={500}
                      />
                    )}
                    <div className={styles.cardCaption}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardMeta}>{item.meta}</p>
                    </div>
                  </button>
                )
              )}
            </div>
          </>
        )}
        {activeTab === "design" && (
          <>
            <div className={styles.cardGrid}>
              {designItems.map((item, i) =>
                item.href ? (
                  <Link
                    key={i}
                    href={item.href}
                    className={styles.card}
                    aria-label={`${item.title}, ${item.meta}`}
                    {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.video ? (
                      <video
                        className={styles.cardMedia}
                        src={item.video}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="auto"
                        aria-hidden
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt=""
                        className={styles.cardImage}
                        width={800}
                        height={500}
                      />
                    )}
                    <div className={styles.cardCaption}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardMeta}>{item.meta}</p>
                    </div>
                  </Link>
                ) : (
                  <button
                    key={i}
                    type="button"
                    className={styles.card}
                    onClick={() => { setOpenTab("design"); setOpenProjectIndex(i); }}
                  >
                    {item.video ? (
                      <video
                        className={styles.cardMedia}
                        src={item.video}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="auto"
                        aria-hidden
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt=""
                        className={styles.cardImage}
                        width={800}
                        height={500}
                      />
                    )}
                    <div className={styles.cardCaption}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardMeta}>{item.meta}</p>
                    </div>
                  </button>
                )
              )}
            </div>
          </>
        )}
        {activeTab === "development" && (
          <>
            <div className={styles.cardGrid}>
              {developmentItems.map((item, i) =>
                item.href ? (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                    aria-label={`${item.title}, ${item.meta}`}
                  >
                    {item.video ? (
                      <video
                        className={styles.cardMedia}
                        src={item.video}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="auto"
                        aria-hidden
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt=""
                        className={styles.cardImage}
                        width={800}
                        height={500}
                      />
                    )}
                    <div className={styles.cardCaption}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardMeta}>{item.meta}</p>
                    </div>
                  </a>
                ) : (
                  <div key={i} className={styles.card} aria-hidden>
                    <img
                      src={item.image}
                      alt=""
                      className={styles.cardImage}
                      width={800}
                      height={500}
                    />
                    <div className={styles.cardCaption}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardMeta}>{item.meta}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>

      {/* Full-height overlay popup - rendered via portal to avoid removeChild/parentNode errors */}
      {overlayEl &&
        createPortal(
          overlayEl,
          document.getElementById("overlay-root") ?? document.body
        )}
    </section>
  );
}
