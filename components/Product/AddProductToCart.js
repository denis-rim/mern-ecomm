import { useState } from "react";

function AddProductToCart() {
  const [quantity, setQuantity] = useState(1);
  // hardcoded quantity
  const inStockQuantity = 5;
  const availableQuantity = Array.from(Array(inStockQuantity + 1).keys()).slice(
    1
  );

  return (
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
  );
}

export default AddProductToCart;
