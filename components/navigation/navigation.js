import { useEffect } from 'react';
import { useRouter } from 'next/router'; 
import { SmartLink } from '../link-item';
import dynamic from 'next/dynamic';
import { useShallow } from 'zustand/shallow'
import { globalStore } from '@/store/globalStore';
import clsx from 'clsx';
import st from './navigation.module.css';

const Twitter = dynamic(() => import('../logo/Twitter.svg'))
  , Tele = dynamic(() => import('../logo/Telegram.svg'))
  , LinkedIn = dynamic(() => import('../logo/LinkedIn.svg'))
  , Youtube = dynamic(() => import('../logo/Youtube.svg'));

export const Navigation = ({ data, className }) => {
  const [navIsOpen, setNavIsOpen] = globalStore(useShallow(state => [state.navIsOpen, state.setNavIsOpen]))
    , isLenis = globalStore(({ lenis }) => lenis)
    , x = useRouter();

  useEffect(() => {
    isLenis && (navIsOpen ? isLenis.stop() : isLenis.start())
  }, [navIsOpen, isLenis]);

  useEffect(() => {
    let a = () => {
      setNavIsOpen(!1)
    };
    return x.events.on("routeChangeStart", a),
      () => {
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
