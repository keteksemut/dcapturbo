import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
console.log('NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);

  return <Component {...pageProps} />;
}
