// import "@/styles/globals.css";
import { ShinAuthContextProvider } from "@/contexts/shin-auth-context";

export default function App({ Component, pageProps }) {
  return <ShinAuthContextProvider>
    <Component {...pageProps} />
  </ShinAuthContextProvider>;
}
