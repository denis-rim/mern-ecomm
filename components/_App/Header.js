import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  ShoppingCartIcon,
  PlusIcon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import NProgress from "nprogress";

const headerButtons = [
  {
    name: "Create",
    href: "/create",
    icon: PlusIcon,
  },
  {
    name: "Account",
    href: "/account",
    icon: UserIcon,
  },
  {
    name: "Cart",
    href: "/cart",
    icon: ShoppingCartIcon,
  },
];

function Header() {
  const router = useRouter();
  const user = true;
  const admin = true;

  // Handle loading progress bar
  useEffect(() => {
    const handleRoteChangeStart = () => NProgress.start();
    const handleRoteChangeStop = () => NProgress.done();

    router.events.on("routeChangeStart", handleRoteChangeStart);
    router.events.on("routeChangeComplete", handleRoteChangeStop);
    router.events.on("routeChangeError", handleRoteChangeStop);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRoteChangeStart);
      router.events.off("routeChangeComplete", handleRoteChangeStop);
      router.events.off("routeChangeError", handleRoteChangeStop);
    };
  }, []);

  function isActive(route) {
    return route === router.pathname;
  }

  return (
    <Popover className="relative bg-indigo-500">
      <div className="flex justify-between items-center px-4 py-2 sm:px-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/">
            <a className="h-8 w-auto sm:h-10">
              <span className="sr-only">React Reserve</span>
              <ShoppingBagIcon className="h-10 w-10 text-gray-50" />
            </a>
          </Link>
        </div>

        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>

        <div className="hidden md:flex space-x-10">
          <div className="relative flex gap-6 px-5 py-6 sm:gap-8 sm:p-2">
            {user ? (
              <>
                {admin && (
                  <Link href="/create">
                    <a
                      className={`-m-1 p-1 pr-2 flex items-start rounded-md ${
                        isActive("/create") ? "bg-indigo-400" : "bg-indigo-500"
                      }  text-white hover:bg-indigo-400`}
                    >
                      <div className="flex items-center justify-center ">
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10  sm:h-8 sm:w-8">
                          <PlusIcon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-2">
                          <p className="text-base font-medium">Create</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                )}
              </>
            ) : null}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <Link href="/cart">
            <a
              className={`p-1 pr-2 ml-4 flex items-start rounded-md ${
                isActive("/cart") ? "bg-indigo-400" : "bg-indigo-500"
              }  text-white hover:bg-indigo-400`}
            >
              <div className="flex items-center justify-center ">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10  sm:h-8 sm:w-8">
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-2">
                  <p className="text-base font-medium">Cart</p>
                </div>
              </div>
            </a>
          </Link>
          {!user ? (
            <>
              <Link href="/">
                <a className="text-gray-500 ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-100 hover:bg-gray-300">
                  Sign in
                </a>
              </Link>
              <Link href="/">
                <a className="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Sign up
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/account">
                <a
                  className={`p-1 pr-2 ml-4 flex items-start rounded-md ${
                    isActive("/account") ? "bg-indigo-400" : "bg-indigo-500"
                  }  text-white hover:bg-indigo-400`}
                >
                  <div className="flex items-center justify-center ">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10  sm:h-8 sm:w-8">
                      <UserIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="ml-2">
                      <p className="text-base font-medium">Account</p>
                    </div>
                  </div>
                </a>
              </Link>
              <Link href="/">
                <a className="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Log out
                </a>
              </Link>
            </>
          )}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-50 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid grid-cols-1 gap-7">
                  {headerButtons.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4 text-base font-medium text-gray-900">
                        {item.name}
                      </div>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="mt-6">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Log out
                </a>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{" "}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Header;
