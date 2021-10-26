import Link from "next/link";
import {
  CogIcon,
  ViewGridAddIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

function AccountLayout({ user, children }) {
  const router = useRouter();

  const isRoot = user?.role === "root";
  const isAdmin = user?.role === "admin";

  const isRootOrAdmin = isRoot || isAdmin;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function isCurrentPage(page) {
    return page === router.pathname;
  }

  return (
    <div>
      <main>
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav className="space-y-1">
                  <Link href="/account">
                    <a
                      className={classNames(
                        isCurrentPage("/account")
                          ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                          : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                        "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                      )}
                    >
                      <CogIcon
                        className={classNames(
                          isCurrentPage("/account")
                            ? "text-teal-500 group-hover:text-teal-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">Account</span>
                    </a>
                  </Link>

                  <Link href="/orders">
                    <a
                      className={classNames(
                        isCurrentPage("/orders")
                          ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                          : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                        "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                      )}
                    >
                      <ShoppingBagIcon
                        className={classNames(
                          isCurrentPage("/orders")
                            ? "text-teal-500 group-hover:text-teal-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">Orders History</span>
                    </a>
                  </Link>

                  {isRootOrAdmin && (
                    <Link href="/create">
                      <a
                        className={classNames(
                          isCurrentPage("/create")
                            ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                            : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                          "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                        )}
                      >
                        <ViewGridAddIcon
                          className={classNames(
                            isCurrentPage("/create")
                              ? "text-teal-500 group-hover:text-teal-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">Create</span>
                      </a>
                    </Link>
                  )}
                  {user?.role === "root" && (
                    <Link href="/users">
                      <a
                        className={classNames(
                          isCurrentPage("/users")
                            ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                            : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                          "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                        )}
                      >
                        <UserCircleIcon
                          className={classNames(
                            isCurrentPage("/users")
                              ? "text-teal-500 group-hover:text-teal-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">Users</span>
                      </a>
                    </Link>
                  )}
                </nav>
              </aside>

              <div className="divide-y divide-gray-200 lg:col-span-9">
                <div className="py-6 px-4 sm:p-6 lg:pb-8">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AccountLayout;
