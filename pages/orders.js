import axios from "axios";
import { parseCookies } from "nookies";
import AccountLayout from "../components/Account/AccountLayout";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Button from "../components/shared/Button";
import baseUrl from "../utils/baseUrl";
import formatDate from "../utils/formatDate";

function Orders({ user, orders }) {
  return (
    <AccountLayout user={user}>
      <main>
        <div className="max-w-7xl mx-auto sm:px-2">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
          </div>
        </div>

        <section aria-labelledby="recent-heading" className="mt-10">
          <h2 id="recent-heading" className="sr-only">
            Recent orders
          </h2>
          <div className="max-w-7xl mx-auto">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center">
                <h1 className="text-center py-4 text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                  No past orders.
                </h1>
                <Button href="/">View collections</Button>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
                  >
                    <h3 className="sr-only">
                      Order placed on{" "}
                      <time dateTime={formatDate(order.createdAt)}>
                        {formatDate(order.createdAt)}
                      </time>
                    </h3>

                    <div className="flex items-center justify-between p-4 border-b border-gray-200 sm:p-6">
                      <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                        <div>
                          <dt className="font-medium text-gray-900">
                            Order number
                          </dt>
                          <dd className="mt-1 text-gray-500">{order._id}</dd>
                        </div>
                        <div className="hidden sm:block">
                          <dt className="font-medium text-gray-900">
                            Date placed
                          </dt>
                          <dd className="mt-1 text-gray-500">
                            <time dateTime={formatDate(order.createdAt)}>
                              {formatDate(order.createdAt)}
                            </time>
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-900">
                            Total amount
                          </dt>
                          <dd className="mt-1 font-medium text-gray-900">
                            {order.total} €
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Products */}
                    <h4 className="sr-only">Items</h4>
                    <ul role="list" className="divide-y divide-gray-200">
                      {order.products.map((product) => (
                        <li key={product._id} className="p-4 sm:p-6">
                          <div className="flex items-center sm:items-start">
                            <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                              <img
                                src={product.product.mediaUrl}
                                alt={product.product.mediaUrl}
                                className="w-full h-full object-center object-cover"
                              />
                            </div>
                            <div className="flex-1 ml-6 text-sm">
                              <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                <h5>{product.product.name}</h5>
                                <p className="mt-2 sm:mt-0">
                                  {product.product.price} €
                                </p>
                              </div>
                              <p className="hidden text-gray-500 sm:block sm:mt-2">
                                {product.product.description}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 sm:flex sm:justify-between">
                            <div className="flex items-center">
                              <CheckCircleIcon
                                className="w-5 h-5 text-green-500"
                                aria-hidden="true"
                              />
                              <p className="ml-2 text-sm font-medium text-gray-500">
                                Delivered on{" "}
                                <time dateTime={formatDate(order.createdAt)}>
                                  {formatDate(order.createdAt)}
                                </time>
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </AccountLayout>
  );
}

export default Orders;

Orders.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return { orders: [] };
  }

  const response = await axios.get(`${baseUrl}/api/orders`, {
    headers: { Authorization: token },
  });

  return response.data;
};
