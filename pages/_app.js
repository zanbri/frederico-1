import Layout from "../components/Layout";
import { AppContextProvider } from "../components/AppContext";

import "../styles/output.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}
