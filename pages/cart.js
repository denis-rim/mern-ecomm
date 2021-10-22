import axios from "axios";
import { parseCookies } from "nookies";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import baseUrl from "../utils/baseUrl";

function Cart({ products, user }) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:py-18 sm:px-6 lg:px-0">
      <h1 className="text-3xl py-16 font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>
      <CartItemList user={user} products={products} />
      <CartSummary products={products} />
    </div>
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
