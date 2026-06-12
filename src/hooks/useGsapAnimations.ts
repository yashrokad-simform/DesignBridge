import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One-time layout entrance: sidebar slides in from the left with its
 * nav items staggering, the header drops in from the top.
 * Purely additive — only animates existing elements via refs/selectors.
 */
export function useLayoutEntrance(
  rootRef: RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".pl-sidebar", {
        x: -32,
        autoAlpha: 0,
        duration: 0.55,
      })
        .from(
          ".pl-sidebar .dsn-brand, .pl-sidebar .dsn-search-wrap, .pl-sidebar .dsn-item",
          {
            x: -16,
            autoAlpha: 0,
            duration: 0.4,
            stagger: 0.02,
            clearProps: "all",
          },
          "-=0.35",
        )
        .from(
          ".pl-header",
          { y: -16, autoAlpha: 0, duration: 0.45, clearProps: "all" },
          "<",
        );
    },
    { scope: rootRef },
  );
}

/**
 * Barba-style page transition on route change: the content area fades
 * and slides up into place, then variant cards reveal as they scroll
 * into view inside the `.pl-content` scroll container.
 */
export function usePageTransition(
  contentRef: RefObject<HTMLDivElement | null>,
  pathname: string,
) {
  useGSAP(
    (_context, contextSafe) => {
      const content = contentRef.current;
      if (!content || !contextSafe) return;

      // route changed — reset the internal scroll container to the top
      content.scrollTo({ top: 0 });

      if (prefersReducedMotion()) return;

      const animate = contextSafe(() => {
        // Single cheap tween on the container — animating each heavy
        // child individually causes paint jank on large pages.
        gsap.killTweensOf(content);
        gsap.fromTo(
          content,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            clearProps: "all",
            force3D: true,
          },
        );

        // Scroll-reveal for variant cards. Only leaf cards (.cp-vs) —
        // animating their .cp-vg parents too made the same nodes move
        // twice and stuttered.
        const cards = gsap.utils.toArray<HTMLElement>(
          content.querySelectorAll(".cp-vs"),
        );

        if (cards.length) {
          gsap.set(cards, { autoAlpha: 0, y: 20 });
          // Direct stagger — avoids scroll-position detection against the wrong
          // scroller (.cp-variant-bd scrolls independently inside .cp-bottom-panel,
          // so ScrollTrigger.batch with scroller:content never fires for sections
          // that are below the inner scroll container's fold).
          gsap.to(cards, {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.06,
            clearProps: "all",
            force3D: true,
            overwrite: true,
            delay: 0.05,
          });
        }
      });

      animate();

      // Lazy routes resolve after Suspense — when the real page replaces
      // the loader, run the enter animation once more for the new nodes.
      const observer = new MutationObserver(() => {
        observer.disconnect();
        animate();
      });
      observer.observe(content, { childList: true });

      return () => observer.disconnect();
    },
    { scope: contentRef, dependencies: [pathname] },
  );
}

/**
 * GSAP-driven side drawer: slides the panel in/out and fades the
 * backdrop. Deliberately minimal — a deterministic fromTo so the
 * start/end positions never depend on GSAP's cached transform state
 * (which StrictMode's double-mount otherwise invalidates).
 */
export function useDrawerAnimation(
  drawerRef: RefObject<HTMLDivElement | null>,
  backdropRef: RefObject<HTMLDivElement | null>,
  open: boolean,
) {
  useGSAP(
    () => {
      const drawer = drawerRef.current;
      const backdrop = backdropRef.current;
      if (!drawer || !backdrop) return;

      // GSAP owns the transform — neutralise the CSS transition
      drawer.style.transition = "none";
      backdrop.style.pointerEvents = open ? "auto" : "none";

      const reduced = prefersReducedMotion();

      if (open) {
        gsap.to(backdrop, {
          autoAlpha: 1,
          duration: reduced ? 0 : 0.25,
          ease: "power2.out",
          overwrite: true,
        });
        // fromTo: explicit start AND end — x: 0 clears the px offset
        // GSAP bakes in when parsing the CSS translateX(100%)
        gsap.fromTo(
          drawer,
          { x: 0, xPercent: 100 },
          {
            xPercent: 0,
            duration: reduced ? 0 : 0.45,
            ease: "power3.out",
            overwrite: true,
          },
        );
      } else {
        gsap.to(backdrop, {
          autoAlpha: 0,
          duration: reduced ? 0 : 0.2,
          ease: "power2.in",
          overwrite: true,
        });
        gsap.to(drawer, {
          x: 0,
          xPercent: 100,
          duration: reduced ? 0 : 0.35,
          ease: "power3.in",
          overwrite: true,
        });
      }
    },
    { dependencies: [open] },
  );
}
