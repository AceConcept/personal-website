"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { interpolate } from "flubber";

/* Bar at left edge (x 0–2) so it stays put and shape expands rightward */
const BAR_PATH = "M0,0 L2,0 L2,16 L0,16 Z";

/* Rounded rect as polygon (12 points) so flubber keeps smooth corners instead of a hexagon */
const ROUNDED_RECT_PATH =
  "M2,0 L14,0 L15.4,0.6 L16,2 L16,14 L15.4,15.4 L14,16 L2,16 L0.6,15.4 L0,14 L0,2 L0.6,0.6 L2,0 Z";

const ICON_PATH =
  "M9,1 L7,1 C5.93949,1.00116 4.92275,1.42296 4.17285,2.17285 C3.42296,2.92275 3.00116,3.93949 3,5 L3,11 C3.00116,12.0605 3.42296,13.0773 4.17285,13.8271 C4.92275,14.577 5.93949,14.9988 7,15 L9,15 C10.0605,14.9988 11.0773,14.577 11.8271,13.8271 C12.577,13.0773 12.9988,12.0605 13,11 L13,5 C12.9988,3.93949 12.577,2.92275 11.8271,2.17285 C11.0773,1.42296 10.0605,1.00116 9,1 Z M8.5,7 C8.5,7.13261 8.44732,7.25978 8.35355,7.35355 C8.25978,7.44732 8.13261,7.5 8,7.5 C7.86739,7.5 7.74021,7.44732 7.64645,7.35355 C7.55268,7.25978 7.5,7.13261 7.5,7 L7.5,4 C7.5,3.86739 7.55268,3.74021 7.64645,3.64645 C7.74021,3.55268 7.86739,3.5 8,3.5 C8.13261,3.5 8.25978,3.55268 8.35355,3.64645 C8.44732,3.74021 8.5,3.86739 8.5,4 L8.5,7 Z";

const FLUBBER_OPTS = { maxSegmentLength: 2 };
const barToRound = interpolate(BAR_PATH, ROUNDED_RECT_PATH, FLUBBER_OPTS);
const roundToIcon = interpolate(ROUNDED_RECT_PATH, ICON_PATH, FLUBBER_OPTS);

const DURATION_MS = 700;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function getPathD(progress: number): string {
  if (progress <= 0) return BAR_PATH;
  if (progress >= 1) return ICON_PATH;
  if (progress < 0.5) {
    const t = progress * 2;
    return barToRound(easeOutCubic(t));
  }
  const t = (progress - 0.5) * 2;
  return roundToIcon(easeOutCubic(t));
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [morphProgress, setMorphProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);
  const progressRef = useRef(0);
  progressRef.current = morphProgress;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const runMorph = useCallback((toHovered: boolean) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const startProgress = progressRef.current;
    const targetProgress = toHovered ? 1 : 0;
    const duration = DURATION_MS * Math.abs(targetProgress - startProgress);
    startTimeRef.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const linear = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(linear);
      const progress = startProgress + (targetProgress - startProgress) * eased;
      setMorphProgress(progress);
      if (linear < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const handleCtaMouseEnter = () => runMorph(true);
  const handleCtaMouseLeave = () => runMorph(false);

  const pathD = getPathD(morphProgress);

  return (
    <nav
      className={`navbar${scrolled ? " navbarScrolled" : ""}`}
      aria-label="Main navigation"
    >
      <a href="/" className="navbarLogo">
        atencium-ui
      </a>
      <div className="navbarLinks">
        <a href="#gallery">Gallery</a>
        <a href="#design">Design</a>
        <a href="#dev-projects">Dev Projects</a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          Github
        </a>
        <a
          href="/test"
          className="navbarCta"
          onMouseEnter={handleCtaMouseEnter}
          onMouseLeave={handleCtaMouseLeave}
        >
          <span className="navbarCtaDivider" aria-hidden>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="navbarCtaMorphSvg"
            >
              <path d={pathD} fill="#DEC312" />
            </svg>
          </span>
          <span className="navbarCtaInner">Book Call</span>
        </a>
      </div>
    </nav>
  );
}
