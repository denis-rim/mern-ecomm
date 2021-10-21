import axios from "axios";
import Incentives from "../components/Index/Incentives";
import ProductList from "../components/Index/ProductList";
import Trending from "../components/Index/Trending";
import baseUrl from "../utils/baseUrl";

export default function Home({ products }) {
  return (
    <>
      <Trending products={products} />
      <ProductList products={products} />
      <Incentives />
    </>
  );
}

Home.getInitialProps = async () => {
  // Fetch data on the server
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url);
  // Return response data as object
  return { products: response.data };
};
