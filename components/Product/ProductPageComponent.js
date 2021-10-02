import { CheckIcon } from "@heroicons/react/solid";

function ProductPageComponent({ name, price, description, mediaUrl }) {
  return (
    <div className="bg-white">
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
                  className="rounded-md p-1 border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                </select>
              </div>
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

        {/* Product form */}
        <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
          <section aria-labelledby="options-heading">
            <form>
              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Add to bag
                </button>
              </div>
              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Delete
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductPageComponent;
