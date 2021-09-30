import Head from "next/head";
import Header from "./Header";
import HeadContent from "./HeadContent";

function Container({ children }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  );
}

function Layout({ children }) {
  return (
    <>
      <Head>
        <HeadContent />
        <title>ReactReserve</title>
      </Head>
      <Header />
      <Container>{children}</Container>
    </>
  );
}

export default Layout;
