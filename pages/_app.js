import Layout from "../components/Layout";
import { AppContextProvider } from "../components/AppContext";

import "../styles/styles.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}
