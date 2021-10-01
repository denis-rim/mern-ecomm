import axios from "axios";

export default function Home({ products }) {
  console.log(products);
  return <>Home</>;
}

Home.getInitialProps = async () => {
  // Fetch data on the server
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url);
  // Return response data as object
  return { products: response.data };
};
