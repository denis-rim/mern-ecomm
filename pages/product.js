import axios from "axios";
import ProductPageComponent from "../components/Product/ProductPageComponent";
import baseUrl from "../utils/baseUrl";

function Product({ product, user }) {
  return <ProductPageComponent user={user} {...product} />;
}

Product.getInitialProps = async ({ query: { id } }) => {
  const url = `${baseUrl}/api/product`;
  const payload = { params: { id } };
  const response = await axios.get(url, payload);
  return { product: response.data };
};

export default Product;