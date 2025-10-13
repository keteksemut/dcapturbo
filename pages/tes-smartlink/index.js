import { useEffect } from "react";
import { Header } from "@/components/header/header";
import { globalStore } from "@/store/globalStore";

const mockHeaderData = {
  navigationLinks: {
    items: [
      { text: "Home", url: "/" },
      { text: "About", url: "/about" },
      { text: "Contact", url: "/contact" },
    ],
  },
  socialMedia: {
    items: [
      { url: "https://twitter.com/example" },
      { url: "https://t.me/example" },
      { url: "https://linkedin.com/company/example" },
      { url: "https://youtube.com/@example" },
    ],
  },
};

export default function TestHeaderPage() {
  const setHeaderData = globalStore((state) => state.setHeaderData);

  useEffect(() => {
      setHeaderData(mockHeaderData);
  }, [setHeaderData]);

  return (
    <div style={{ height: "200vh", background: "#fafafa" }}>
      <Header isoLogo={false} appear={{ use: false, state: true }} />
      <p style={{ margin: "2rem" }}>Mock CMS Data Injected</p>
    </div>
  );
}
