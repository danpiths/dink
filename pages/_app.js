import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { UserContextWrapper } from "../context/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserContextWrapper>
      <div className="flex min-h-screen flex-col">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </UserContextWrapper>
  );
}

export default MyApp;
