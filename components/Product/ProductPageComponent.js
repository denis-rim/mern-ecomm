import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import DeleteProductModal from "../DeleteProductModal";
import Button from "../shared/Button";

function ProductPageComponent({
  _id,
  name,
  price,
  description,
  sku,
  mediaUrl,
  user,
}) {
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  //TODO: add to product model quantity instead of hardcoded value
  const inStockQuantity = 5;
  const availableQuantity = Array.from(Array(inStockQuantity + 1).keys()).slice(
    1
  );
  const isRoot = user?.role === "root";
  const isAdmin = user?.role === "admin";
  const isRootOrAdmin = isRoot || isAdmin;

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setInterval(() => setSuccess(false), 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  async function handleDeleteProduct() {
    try {
      const url = `${baseUrl}/api/product`;
      const payload = { params: { _id } };
      await axios.delete(url, payload);
      await router.push("/");
    } catch (error) {
      catchErrors(error, window.alert("Failed to вудуеу product."));
    }
  }

  async function handleAddProductToCart() {
    try {
      setLoading(true);
      const token = cookie.get("token");
      await axios.put(
        `${baseUrl}/api/cart`,
        { quantity, _id },
        { headers: { Authorization: token } }
      );
      setSuccess(true);
    } catch (error) {
      // TODO: replace alert to notification
      catchErrors(error, window.alert("Failed to add product."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white">
      <DeleteProductModal
        open={modal}
        setModal={setModal}
        handleDeleteProduct={handleDeleteProduct}
      />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">{price} €</p>

              <div className="ml-4">
                <label htmlFor="quantity" className="sr-only">
                  Quantity
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  className="rounded-md p-1.5 w-14 border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                >
                  {availableQuantity.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>

              {/*<AddProductToCart />*/}

              <span className="inline-flex items-center ml-2 px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                SKU {sku}
              </span>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{description}</p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className="flex-shrink-0 w-5 h-5 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm text-gray-500">
                In stock and ready to ship
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={mediaUrl}
              alt={`${name} picture`}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        <div className="mt-2 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
          <section aria-labelledby="options-heading">
            <div>
              <div className="mt-10">
                {user ? (
                  <Button
                    className="w-full"
                    disabled={success || loading}
                    loading={loading}
                    onClick={handleAddProductToCart}
                  >
                    {user && success ? "Item Added" : "Add to Cart"}
                  </Button>
                ) : (
                  <Button href="/login" className="w-full">
                    Log In To Purchase
                  </Button>
                )}
              </div>
              {isRootOrAdmin && (
                <div className="mt-6 text-center">
                  <Button appearance="danger" onClick={() => setModal(true)}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductPageComponent;
