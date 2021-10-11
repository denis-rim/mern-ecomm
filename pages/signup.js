import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../components/shared/Button";
import { ErrorNotification } from "../components/shared/NotificationModal";
import catchErrors from "../utils/catchErrors";

const INITIAL_USER = {
  name: "",
  email: "",
  password: "",
};

function Signup() {
  const [user, setUser] = useState(INITIAL_USER);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

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
      // set loading state
      setLoading(true);
      setError("Wrong username");
      console.log(user);
      //
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
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                User
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  required
                  onChange={(event) => handleChange(event)}
                  value={user.name}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

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
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(event) => handleChange(event)}
                  value={user.password}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <Button disabled={disabled || loading} className="w-full">
                Sign in
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Existing user?{" "}
            <Link href="/login">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                Log in here
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
