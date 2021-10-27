import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../components/shared/Button";
import { ErrorNotification } from "../components/shared/NotificationModal";
import { handleLogin } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const INITIAL_USER = {
  email: "",
  password: "",
};

function Login() {
  const [user, setUser] = useState(INITIAL_USER);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(`${baseUrl}/api/login`, { ...user });

      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {Boolean(error) && <ErrorNotification text={error} />}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(event) => handleChange(event)}
                  value={user.email}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              {/*<div className="mt-1">*/}
              {/*  <input*/}
              {/*    id="password"*/}
              {/*    name="password"*/}
              {/*    type="password"*/}
              {/*    autoComplete="current-password"*/}
              {/*    required*/}
              {/*    onChange={(event) => handleChange(event)}*/}
              {/*    value={user.password}*/}
              {/*    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
              {/*  />*/}
              {/*</div>*/}
              {/*<button*/}
              {/*  type="button"*/}
              {/*  onClick={() => setHidden((prevState) => !prevState)}*/}
              {/*  className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"*/}
              {/*>*/}
              {/*  <span>Show</span>*/}
              {/*</button>*/}

              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                  <input
                    id="password"
                    name="password"
                    type={hidden ? "password" : "text"}
                    autoComplete="current-password"
                    required
                    onChange={(event) => handleChange(event)}
                    value={user.password}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md  sm:text-sm border-gray-300"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setHidden((prevState) => !prevState)}
                  className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <span>Show</span>
                </button>
              </div>
            </div>

            <div>
              <Button disabled={disabled || loading} className="w-full">
                Log in
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Dont have an account?{" "}
            <Link href="/signup">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                Create an account
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
