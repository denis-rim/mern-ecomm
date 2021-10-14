import axios from "axios";
import { parseCookies } from "nookies";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import baseUrl from "../utils/baseUrl";

function Cart({ products }) {
  return (
    <>
      <CartItemList products={products} />
      <CartSummary />
    </>
  );
}

Cart.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }

  const response = await axios.get(`${baseUrl}/api/cart`, {
    headers: { Authorization: token },
  });

  return { products: response.data };
};

export default Cart;
