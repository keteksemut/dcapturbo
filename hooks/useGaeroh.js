import { useEffect } from "react"; 
import { useStore } from "../store/useStore";

export default function useLenisScroll(a) {
  const i = arguments[1] ?? [];
  const lenis = useStore((state) => state.lenis);

  useEffect(() => {
    if (lenis) lenis.on("scroll", a);
    return () => {
      if (lenis) lenis.off("scroll", a);
    };
  }, [lenis, a, [...i]]);
}
