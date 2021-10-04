import axios from "axios";
import ProductPageComponent from "../components/Product/ProductPageComponent";
import baseUrl from "../utils/baseUrl";

function Product({ product }) {
  return <ProductPageComponent {...product} />;
}

Product.getInitialProps = async ({ query: { id } }) => {
  const url = `${baseUrl}/api/product`;
  const payload = { params: { id } };
  const response = await axios.get(url, payload);
  return { product: response.data };
};

export default Product;
