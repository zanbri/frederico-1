import Head from "next/head";
import Layout from "../components/Layout";
import { AppContextProvider } from "../components/AppContext";

import "../styles/main.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <title>Frederico Ramos Lopes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}
