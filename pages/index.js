import axios from "axios";
import ProductList from "../components/Index/ProductList";

export default function Home({ products }) {
  return <ProductList products={products} />;
}

Home.getInitialProps = async () => {
  // Fetch data on the server
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url);
  // Return response data as object
  return { products: response.data };
};
