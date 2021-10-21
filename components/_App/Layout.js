import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

function Container({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  );
}

function Layout({ children, user }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <title>ReactReserve</title>
      </Head>
      <Header user={user} />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}

export default Layout;
