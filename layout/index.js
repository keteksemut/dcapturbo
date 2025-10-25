export default function Layout(a) {
  const {
    metadata: i = {
      title: "Drive Capital",
      description: "Drive Capital Website",
      image: {
        url: "https://drive-capital-website.vercel.app/api/og?pagename=drive%20capital",
      },
      keywords: "",
    },
    children: t,
    theme: s = "light",
    className: o,
    headerAppear: n = { use: !1, state: !1 },
    scroll: c = !0,
    isoLogo: l = !1,
    noise: p = !0,
  } = a,
    [h, f] = (0, d.P)((a) => [a.lenis, a.setLenis]),
    y = (0, d.P)((a) => a.setHeaderHeight),
    u = (0, j.useRouter)(),
    [G, { height: E }] = (0, Q.A)({ debounce: 100 }),
    [A, D] = (0, w.useState)(
      u.asPath.includes("#") ? "#" + u.asPath.split("#").pop() : void 0,
    );
  ((0, w.useEffect)(() => {
    let a = new x.A({
      duration: 1.2,
      easing: (a) => Math.min(1, 1.001 - Math.pow(2, -10 * a)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !0,
    });
    return (
      (a.pathname = window.location.pathname),
      (window.lenis = a),
      f(a),
      () => {
        a.destroy();
      }
    );
  }, []),
    (0, w.useEffect)(() => {
      h &&
        (c
          ? h.start()
          : setTimeout(() => {
            h.stop();
          }, 0));
    }, [h, c]));
  let [S] = (0, w.useState)(u.pathname),
    [B, V] = (0, w.useState)(!1);
  return (
    (0, w.useEffect)(() => {
      u.events.on("routeChangeStart", function(a) {
        a !== S && V(!0);
      });
    }, [u, S]),
    (0, w.useEffect)(() => {
      y(E);
    }, [E]),
    (0, w.useEffect)(() => {
      if (h && A && !B && c) {
        let a = document.querySelector(A);
        h.scrollTo(a, { offset: -1.1 * E });
      }
    }, [h, A, E, B, c]),
    (0, w.useEffect)(() => {
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
    }, []),
    (0, k.j$)((a) => {
      null == h || h.raf(a);
    }, []),
    (0, r.jsxs)(r.Fragment, {
      children: [
        (0, r.jsx)(m, { ...i }),
        (0, r.jsxs)("div", {
          className: (0, e.A)("theme-".concat(s), X().layout, o),
          children: [
            (0, r.jsx)(Z, {}),
            (0, r.jsx)(R, {
              isoLogo: l,
              className: "theme-".concat(s),
              appear: n,
              ref: G,
            }),
            (0, r.jsx)("main", { className: X().main, children: t }),
            (0, r.jsx)(v, { className: "theme-".concat(s) }),
          ],
        }),
        p && (0, r.jsx)($, {}),
      ],
    })
  );
}
