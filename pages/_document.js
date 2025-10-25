import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vercel.com';
  const ogImage = `${siteUrl}/og.jpg`;

  console.log(siteUrl);

  return (
    <Html lang="en">
    <Head>
      <meta property="og:title" content="My Site - Default" />
      <meta property="og:description" content="Default description" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
    </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
