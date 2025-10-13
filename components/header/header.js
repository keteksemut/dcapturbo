import { forwardRef } from "react";
import dynamic from "next/dynamic";
import { globalStore } from "@/store/globalStore";
import { useShallow } from "zustand/shallow";
import { Navigation } from "../navigation/navigation";
import { SmartLink } from "../link-item";
import clsx from "clsx";
import st from "./header.module.css";

const LogoMark = dynamic(() => import('../logo/LogoMark.svg'))
  , IsoLogo = dynamic(() => import('../logo/IsoLogo.svg'));

export const Header = forwardRef(({ isoLogo, appear, className }, ref) => {
  const [navIsOpen, setNavIsOpen] = globalStore(useShallow((state) => [state.navIsOpen, state.setNavIsOpen]))
    , headerData = globalStore((state) => state.headerData);

  return (
    <header
      className={clsx(
        st.header,
        appear.use && st.hide,
        appear.state && st.appear
      )}
      ref={ref}
    >
      {/* Mobile Menu */}
      <Navigation className={clsx(className, "hide-on-desktop")} data={headerData} />

      {/* Header Layout */}
      <div className={clsx("layout-block", st.head)}>
        {/* Logo */}
        <SmartLink href="/">
          {isoLogo ? (
            <LogoMark className={st["iso-logo"]} />
          ) : (
            <IsoLogo className={st.logo} />
          )}
        </SmartLink>

        {/* Navigation & Menu Button */}
        <div className={st.menu}>
          {/* Navigation Links */}
          <nav
            className={clsx(st.nav, navIsOpen && st.open, "p-s")}
            aria-hidden={!navIsOpen}
            onClick={() => setNavIsOpen(!navIsOpen)}
          >
            {headerData?.navigationLinks?.items.map((item, i) => {
              const { text, url } = item;
              return (
                <SmartLink
                  key={`nav-item-${i}`}
                  className={st.item}
                  href={url}
                  style={{
                    "--i": headerData.navigationLinks.items.length - i,
                  }}
                >
                  <span className={st.text}>{text}</span>
                </SmartLink>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-menu-header"
            aria-label="toggle navigation"
            onClick={() => setNavIsOpen(!navIsOpen)}
            className={clsx(st["menu-button"], navIsOpen && st.open)}
          >
            <div />
            <div />
            <div />
          </button>
        </div>
      </div>
    </header>
  );
});
