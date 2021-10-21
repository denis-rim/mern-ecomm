import Link from "next/link";

function Trending({ products }) {
  const trendingProducts = products.slice(0, 4);

  return (
    <section aria-labelledby="trending-heading">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:pt-32 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2
            id="favorites-heading"
            className="text-2xl font-extrabold tracking-tight text-gray-900"
          >
            Trending Products
          </h2>
          <Link href="/">
            <a className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
              Shop the collection<span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {trendingProducts.map((product) => (
            <div key={product._id} className="group relative">
              <Link href={`/product?id=${product._id}`}>
                <a>
                  <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                    <img
                      src={product.mediaUrl}
                      alt={product.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    <span className="absolute inset-0" />
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.price} €
                  </p>
                </a>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <Link href="/">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              Shop the collection<span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Trending;
