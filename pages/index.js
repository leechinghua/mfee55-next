import Layout1 from "@/components/layouts/layout1";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <Layout1 title="首頁 | 小新的網站">
      <Head>
        <meta keyword="小新"/>
      </Head>
      <h2>HOME</h2>
      <div><Link href="/index2">測試頁 2</Link></div>
      <div><Link href="/slug/david?a=1&b=2">測試 slug</Link></div>
    </Layout1>
  );
}
