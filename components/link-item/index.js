import { forwardRef, useMemo } from "react";
import { globalStore } from "@/store/globalStore";
import Link from "next/link";

const DEMO_QUERIES = ["?demo=true"];

export const SmartLink = forwardRef(({ href, children, className, scroll = false, shallow, ...rest }, ref) => {
  const lenis = globalStore((state) => state.lenis),

    headerHeight = globalStore((state) => state.headerHeight),

    props = { ref, className, ...rest },

    { isExternal, isMailOrTel, isHash, isShallow } = useMemo(() => ({
      isMailOrTel: href?.startsWith('mailto:') || href?.startsWith('tel:'),
      isHash: href?.startsWith('#'),
      isShallow: DEMO_QUERIES.some((q) => href?.includes(q)),
      isExternal: (() => {
        if (!href?.startsWith('http')) return false;
        try {
          const url = new URL(href, window.location.origin);
          return url.origin !== window.location.origin;
        } catch {
          return false;
        }
      })
    }), [href]),

    handleClick = (e) => {
      if (isHash && lenis) {
        e.preventDefault();
        const target = document.querySelector(href);
        target && lenis.scrollTo(target, { offset: -1.1 * headerHeight });
      }
    };

  if (typeof href !== 'string') return <button {...props}>{children}</button>;

  if (isMailOrTel || isExternal) {
    return (
      <a
        {...props}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  };

  return (
    <Link
      href={href}
      passHref={isHash}
      shallow={isShallow || shallow}
      scroll={scroll}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
});
SmartLink.displayName = 'Smart-link';
