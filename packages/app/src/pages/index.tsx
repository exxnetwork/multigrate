import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";

const Landing = dynamic(() => import("./migrator"), { ssr: false });

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>ExxFi Migrator</title>
          <meta name="description" content="ExxFi Migrator" />
        </Head>

        <Landing />
      </div>
    </>
  );
}
