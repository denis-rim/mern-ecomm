import Link from "next/link";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import calculateCartTotal from "../../utils/calculateCartTotal";
import Button from "../shared/Button";

function CartSummary({ products, handleCheckOut, success }) {
  const [isCartEmpty, setCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products?.length === 0);
  }, [products]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
        <div className="mt-12">
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Subtotal
                  </dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    {cartAmount} €
                  </dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">
                Shipping and taxes will be calculated at checkout.
              </p>
            </div>

            <div className="mt-10">
              <StripeCheckout
                name="React Shop"
                amount={stripeAmount}
                image={products.length > 0 ? products[0].product.mediaUrl : ""}
                currency="EUR"
                shippingAddress={true}
                billingAddress={true}
                zipCode={true}
                token={handleCheckOut}
                triggerEvent="onClick"
                stripeKey="pk_test_51JnziHDoe671UZTh4HJoYqLWk46ZDAq654pjmh9wippOdxwhaZJDWmcpOL7sbThVlPjtT1m3t1Q7NIa4IhI5cOYJ00SZjiiZws"
              >
                <Button className="w-full" disabled={isCartEmpty || success}>
                  Checkout
                </Button>
              </StripeCheckout>
            </div>

            <div className="mt-6 text-sm text-center">
              <p>
                or{" "}
                <Link href="/">
                  <a className="text-indigo-600 font-medium hover:text-indigo-500">
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
