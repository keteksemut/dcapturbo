import { useRouter } from "next/navigation";
import Head from "next/head";
import { useState, useEffect } from "react";
import Lenis from "lenis";
import { useStore } from "@/store/useStore";
import { useFrame } from "@/hooks/useFrame"; 
import useMeasure from "react-use-measure";
import clsx from "clsx";
import st from "./layout.module.css";

export default function Layout(props) {
  const {
    metadata = {
      title: "Drive Capital",
      description: "Drive Capital Website",
      image: {
        url: "https://drive-capital-website.vercel.app/api/og?pagename=drive%20capital",
      },
      keywords: "",
    },
    children,
    theme = "light",
    className,
    headerAppear = { use: !1, state: !1 },
    scroll = !0,
    isoLogo = !1,
    noise = !0,
  } = props,
    [h, f] = useStore((a) => [a.lenis, a.setLenis]),
    y = useStore((a) => a.setHeaderHeight),
    u = useRouter(),
    [G, { height }] = useMeasure({ debounce: 100 }),
    [A, D] = useState(u.asPath.includes("#") ? "#" + u.asPath.split("#").pop() : void 0,);

  useEffect(() => {
    const a = new Lenis({
      duration: 1.2,
      easing: (a) => Math.min(1, 1.001 - Math.pow(2, -10 * a)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !0,
    });
    a.pathname = window.location.pathname;
    window.lenis = a;
    f(a);
    return () => { a.destroy(); };
  }, []);

  useEffect(() => {
    h && (scroll ? h.start() : setTimeout(() => { h.stop(); }, 0));
  }, [h, scroll]);

  const [S] = useState(u.pathname),
    [B, V] = useState(!1);

  useEffect(() => {
    u.events.on("routeChangeStart", function(a) {
      a !== S && V(!0);
    });
  }, [u, S]);

  useEffect(() => {
    y(height);
  }, [height]);

  useEffect(() => {
    if (h && A && !B && scroll) {
      let a = document.querySelector(A);
      h.scrollTo(a, { offset: -1.1 * height });
    }
  }, [h, A, height, B, scroll]);

  useEffect(() => {
    function a(a) {
      a.preventDefault();
      let i = a.currentTarget.href.split("#").pop();
      (D("#" + i),
        setTimeout(() => {
          window.location.hash = i;
        }, 0));
    }
    let i = [...document.querySelectorAll("[href]")].filter((a) =>
      a.href.includes(u.pathname + "#"),
    );
    return (
      i.forEach((i) => {
        i.addEventListener("click", a, !1);
      }),
      () => {
        i.forEach((i) => {
          i.removeEventListener("click", a, !1);
        });
      }
    );
  }, []);

  useFrame((a) => {
    null == h || h.raf(a);
  }, []);

  return (
    <>
      <Head {...metadata} />
      <div
        className={clsx(`theme-${theme}`, st.layout, className)}
      >
       {/* <Z /> */}
       {/* <R
          isoLogo={isoLogo}
          className={`theme-${theme}`}
          appear={headerAppear}
          ref={G}
        />
        */}
        <main className={st.main}>{children}</main>
        {/* <v className={`theme-${theme}`} /> */}
      </div>
      {/* {noise && <$ />} */}
    </>
  );
}
