import { create } from "zustand";

export const globalStore = create((set, get) => ({
  headerData: undefined,
  setHeaderData: (data) => set({ headerData: data }),

  footerData: undefined,
  setFooterData: (data) => ({ footerData: data}),

  navIsOpen: false,
  setNavIsOpen: (navIsOpen) => {
    const before = get().navIsOpen;
    console.log("before:", before);

    set({ navIsOpen });

    const after = get().navIsOpen;
    console.log("after:", after);
  },

  lenis: undefined,
  setLenis: (lenis) => set({ lenis }),

  overflow: true,
  setOverflow: (overflow) => set({ overflow }),

  triggerTransition: '',
  setTriggerTransition: (triggerTransition) => set({ triggerTransition }),

  headerHeight: 0,
  setHeaderHeight: (headerHeight) => set({ headerHeight }),
}));
