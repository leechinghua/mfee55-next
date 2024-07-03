import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout1({ title = "小新的網站", children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar/>
      <div className="container">{children}</div>
      <Footer/>
    </>
  );
}
