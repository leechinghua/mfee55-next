import Layout1 from "@/components/layouts/layout1";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <Layout1 title="首頁 | 小新的網站">
      <Head>
        <meta keyword="小新" />
      </Head>
      <h2>{location.href}</h2>
    </Layout1>
  );
}
