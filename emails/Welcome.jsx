import { Font, Head, Html, Body, Img } from "@react-email/components";

export default function Email() {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Lato"
          fallbackFontFamily="Georgia"
          webFont={{
            url: "https://fonts.gstatic.com/s/lato/v25/S6uyw4BMUTPHjx4wXg.woff2",
            format: "woff2"
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body>
        <Img style={{ width: 100%; }} src="https://images.unsplash.com/photo-1730914957701-5cacfaa77e89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500"/>
      </Body>
    </Html>
  );
};
