import axios from "axios";
import cookie from "js-cookie";
import { parseCookies } from "nookies";
import { useState } from "react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = useState(products);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRemoveFromCart(productId) {
    const token = cookie.get("token");
    const response = await axios.delete(`${baseUrl}/api/cart`, {
      params: { productId },
      headers: { Authorization: token },
    });
    setCartProducts(response.data);
  }

  async function handleCheckOut(paymentData) {
    try {
      setLoading(true);
      const token = cookie.get("token");
      const response = axios.post(
        `${baseUrl}/api/checkout`,
        { paymentData },
        { headers: { Authorization: token } }
      );
      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert("Failed to pay"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:py-18 sm:px-6 lg:px-0">
      <h1 className="text-3xl py-16 font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>
      <CartItemList
        handleRemoveFromCart={handleRemoveFromCart}
        user={user}
        products={cartProducts}
        success={success}
      />
      <CartSummary
        products={cartProducts}
        handleCheckOut={handleCheckOut}
        success={success}
      />
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
