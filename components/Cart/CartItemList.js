import Link from "next/link";
import Button from "../shared/Button";

function CartItemList({ user, products, handleRemoveFromCart, success }) {
  // TODO: Make something more useful
  if (success) {
    return <div>Your order nd payment has been accepted</div>;
  }

  if (products.length === 0) {
    return (
      <>
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-18 sm:px-6 lg:px-0">
            {user ? (
              <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl sm:tracking-tight lg:text-3xl">
                      No product in your cart. Add some.
                    </p>
                    <Button appearance="secondary" href="/" className="mt-14">
                      Add Products
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl sm:tracking-tight lg:text-3xl">
                      No product in your cart. Add some.
                    </p>
                    <Button href="/login" className="mt-14">
                      Log in to Add Products
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <section aria-labelledby="cart-heading">
      <h2 id="cart-heading" className="sr-only">
        Items in your shopping cart
      </h2>

      <ul
        role="list"
        className="border-t border-b border-gray-200 divide-y divide-gray-200"
      >
        {products.map((p) => (
          <li key={p.product._id} className="flex py-6">
            <div className="flex-shrink-0">
              <Link href={`/product?id=${p.product._id}`}>
                <img
                  src={p.product.mediaUrl}
                  alt={`${p.product.name} picture`}
                  className="cursor-pointer w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                />
              </Link>
            </div>

            <div className="ml-4 flex-1 flex flex-col sm:ml-6">
              <div>
                <div className="flex justify-between">
                  <h4 className="text-sm">
                    <Link href={`/product?id=${p.product._id}`}>
                      <a className="cursor-pointer font-medium text-gray-700 hover:text-gray-800">
                        {p.product.name}
                      </a>
                    </Link>
                  </h4>
                  <p className="ml-4 text-sm font-medium text-gray-900">
                    {p.product.price * p.quantity} €
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{`${p.quantity} x ${p.product.price} €`}</p>
              </div>

              <div className="mt-4 flex-1 flex items-end justify-between">
                {/*// TODO: dont forget to add in stock functionality */}
                {/*<p className="flex items-center text-sm text-gray-700 space-x-2">*/}
                {/*  {product.inStock ? (*/}
                {/*    <CheckIcon*/}
                {/*      className="flex-shrink-0 h-5 w-5 text-green-500"*/}
                {/*      aria-hidden="true"*/}
                {/*    />*/}
                {/*  ) : (*/}
                {/*    <ClockIcon*/}
                {/*      className="flex-shrink-0 h-5 w-5 text-gray-300"*/}
                {/*      aria-hidden="true"*/}
                {/*    />*/}
                {/*  )}*/}

                {/*  <span>*/}
                {/*    {product.inStock*/}
                {/*      ? "In stock"*/}
                {/*      : `Will ship in ${product.leadTime}`}*/}
                {/*  </span>*/}
                {/*</p>*/}
                <div className="ml-4">
                  <button
                    onClick={() => handleRemoveFromCart(p.product._id)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CartItemList;
