import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

          {/* <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "http://localhost/",
            "name": "Neoistone: Best Web Development and Hosting services",
            "potentialAction": { "@type": "SearchAction", "target": "http://localhost/search/{search_term_string}/", "query-input": "required name=search_term_string" }
        }
    </script>
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "http://localhost/",
            "name": "Neoistone: Best Web Development and Hosting services",
            "logo": "http://localhost/static/brand/banner_logo.png"
        }
    </script> */}

          <title>ExxFi Multigrate</title>
          <meta
            name="description"
            content="Exx Finance Ecosystem Multichannel Migration and Bridge System"
          />
          <meta
            name="keywords"
            content="Supersonic, salex, defi, blockchain, web3, migrate ssn, ssn tokens, token"
          />
          <meta
            itemProp="image"
            content="https://i.ibb.co/fYGbBmk/SEO-2-1.png"
          ></meta>
          <meta name="msapplication-TileColor" content="#49009E" />
          <meta name="theme-color" content="#ffffff" />

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />

          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:site" content="@exxfinance"></meta>
          <meta name="twitter:creator" content="@exxfinance"></meta>
          <meta name="twitter:title" content="ExxFi Multigrate"></meta>
          <meta
            name="twitter:description"
            content="Exx Finance Ecosystem Multichannel Migration and Bridge System"
          ></meta>
          <meta
            name="twitter:image"
            content="https://i.ibb.co/fYGbBmk/SEO-2-1.png"
          ></meta>

          <meta property="og:url" content="https://exxfi.com/"></meta>
          <meta property="og:site_name" content="ExxFi Multigrate"></meta>
          <meta property="og:title" content="ExxFi Multigrate"></meta>
          <meta
            property="og:image"
            content="https://i.ibb.co/fYGbBmk/SEO-2-1.png"
          ></meta>
          <meta
            property="og:image:secure_url"
            content="https://i.ibb.co/fYGbBmk/SEO-2-1.png"
          />
          <meta
            property="og:description"
            content="Exx Finance Ecosystem Multichannel Migration and Bridge System"
          ></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:locale" content="en-us"></meta>

          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
