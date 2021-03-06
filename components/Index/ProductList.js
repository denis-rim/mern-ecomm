import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <div className="bg-white z-0">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <h2 className="text-4xl text-center font-extrabold mb-12 tracking-tight text-gray-900">
          All Products
        </h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default ProductList;
