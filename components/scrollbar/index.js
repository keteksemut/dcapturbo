import Lenis from 'lenis';
import { useRef, useEffect, useState } from 'react';
import { useWindowSize } from '@reactuses/core';
import { useStore } from '@/store/useStore';
import useMeasure from 'react-use-measure'; 
import clsx from 'clsx';
import st from './scrollbar.module.css';

var U = t(3078),
  W = t(103),
  z = t(230),
  Q = t(8876),
  J = t(5432),
  Y = t.n(J);

export default function ScrollBar() {
  const a = useRef();
  const { width, height } = useWindowSize();
  const lenis = useStore((state) => state.lenis);
  const [x, { heightOne }] = useMeasure();
  const [s, { heightTwo }] = useMeasure();

  U.L((i) => {
    const { scroll, limit } = i;
    a.current &&
      (a.current.style.transform = "translate3d(0,".concat(
        (scroll / limit) * (heightOne - heightTwo),
        "px,0)",
      ));
  });

  const [n, m] = useState(!1);

  useEffect(() => {
    if (n)
      return (
        window.addEventListener("pointermove", a, !1),
        window.addEventListener("pointerup", i, !1),
        () => {
          (window.removeEventListener("pointermove", a, !1),
            window.removeEventListener("pointerup", i, !1));
        }
      );
    function a(a) {
      a.preventDefault();
      const i = (height - heightOne) / 2;
      const r = W._b(0, height, a.clientY, -i, heightOne + i);
      const x = W.qE(0, r / heightOne, 1);
      const s = lenis.limit * x;
      "vertical" === lenis.direction ? window.scrollTo(0, s) : window.scrollTo(s, 0);
    }
    function i() {
      m(!1);
    }
  }, [n, height, width, lenis]);

  return (
    <div className={st.scrollbar} >
      <div ref={x} className={st.inner}>
        <div
          className={st.thumb}
          ref={(i) => {
            a.current = i;
            s(i);
          }}
          onPointerDown={() => {
            m(true);
          }}
        />
      </div>
    </div>
  );
}
ScrollBar.displayName = "Scrollbar";
