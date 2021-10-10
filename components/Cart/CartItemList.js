import Button from "../shared/Button";

function CartItemList({ products }) {
  const user = true;
  return (
    <>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-18 sm:px-6 lg:px-0">
          <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

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

export default CartItemList;
