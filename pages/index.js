import axios from "axios";
import ProductList from "../components/Index/ProductList";
import baseUrl from "../utils/baseUrl";

export default function Home({ products }) {
  return <ProductList products={products} />;
}

Home.getInitialProps = async () => {
  // Fetch data on the server
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url);
  // Return response data as object
  return { products: response.data };
};
