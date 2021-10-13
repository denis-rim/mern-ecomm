import axios from "axios";
import App from "next/app";
import "../styles/globals.css";
import { parseCookies, destroyCookie } from "nookies";
import Layout from "../components/_App/Layout";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const response = await axios.get(`${baseUrl}/api/account`, {
          headers: { Authorization: token },
        });
        const user = response.data;
        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/login");
      }
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

// function MyApp({ Component, pageProps }) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }

export default MyApp;
