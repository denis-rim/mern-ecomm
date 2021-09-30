import Head from "next/head";
import Header from "./Header";

function Container({ children }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  );
}

function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <title>ReactReserve</title>
      </Head>
      <Header />
      <Container>{children}</Container>
    </>
  );
}

export default Layout;
