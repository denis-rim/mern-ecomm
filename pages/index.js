import axios from "axios";
import Incentives from "../components/Index/Incentives";
import Pagination from "../components/Index/Pagination";
import ProductList from "../components/Index/ProductList";
import Trending from "../components/Index/Trending";
import baseUrl from "../utils/baseUrl";

export default function Home({ products, totalPages }) {
  return (
    <>
      <Trending products={products} />
      <ProductList products={products} />
      <Pagination totalPages={totalPages} />
      <Incentives />
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 8;
  // Fetch data on the server
  const response = await axios.get(`${baseUrl}/api/products`, {
    params: { page, size },
  });
  // Return response data as object
  return response.data;
};
