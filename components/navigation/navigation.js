import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SmartLink } from '../link-item';
import dynamic from 'next/dynamic';
import { useShallow } from 'zustand/shallow'
import { useStore } from '@/store/useStore';
import clsx from 'clsx';
import st from './navigation.module.css';

const Twitter = dynamic(() => import('../logo/Twitter.svg'));
const Tele = dynamic(() => import('../logo/Telegram.svg'));
const LinkedIn = dynamic(() => import('../logo/LinkedIn.svg'));
const Youtube = dynamic(() => import('../logo/Youtube.svg'));

export const Navigation = ({ data, className }) => {
  const [navIsOpen, setNavIsOpen] = useStore(useShallow(state => [state.navIsOpen, state.setNavIsOpen]));
  const isLenis = useStore(({ lenis }) => lenis);
  const x = useRouter();

  useEffect(() => {
    isLenis && (navIsOpen ? isLenis.stop() : isLenis.start())
  }, [navIsOpen, isLenis]);

  useEffect(() => {
    const a = () => { setNavIsOpen(false) };
    x.events.on("routeChangeStart", a);
    return () => {
      x.events.off("routeChangeStart", a)
    }
  }, [navIsOpen]);

  return (
    <div className={clsx(st.menu, { [st.closed]: !navIsOpen }, className)}>
      <nav className={st.navigation}>
        {data?.navigationLinks?.items.map(({ text, url }, i) => (
          <SmartLink
            key={`nav-item-${i}`}
            className={clsx(st.link, "h5")}
            href={url}
          >
            <span className="p-s">{`0${i + 1}`}</span>
            {text}
          </SmartLink>
        ))}
      </nav>

      <div className={st.social}>
        {data?.socialMedia?.items.map(({ url }, i) => {
          return (
            <SmartLink
              key={"social-media-item-".concat(i)}
              className={clsx(st.icon, "h5")}
              href={url}
            >
              {url.includes("twitter") && <Twitter />}
              {url.includes("@") && <Tele />}
              {url.includes("linkedin") && <LinkedIn />}
              {url.includes("youtube") && <Youtube />}
            </SmartLink>
          );
        })}
      </div>
    </div>
  );
};
Navigation.displayName = 'Nav';
