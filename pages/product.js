import axios from "axios";

function Product({ product }) {
  console.log(product);
  return <>Product</>;
}

Product.getInitialProps = async ({ query: { id } }) => {
  const url = "http://localhost:3000/api/product";
  const payload = { params: { id } };
  const response = await axios.get(url, payload);
  return { product: response.data };
};

export default Product;
