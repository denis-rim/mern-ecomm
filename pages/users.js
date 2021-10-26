import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useRef, useState } from "react";
import AccountLayout from "../components/Account/AccountLayout";
import AccountHeader from "../components/shared/AccountHeader";
import Toggle from "../components/shared/Toggle";
import baseUrl from "../utils/baseUrl";

function Users({ user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const token = cookie.get("token");

    const response = await axios.get(`${baseUrl}/api/users`, {
      headers: { Authorization: token },
    });

    setUsers(response.data);
  }

  return (
    <AccountLayout user={user}>
      <AccountHeader>Manage users</AccountHeader>
      <UserTable users={users} />
    </AccountLayout>
  );
}

function UserTable({ users }) {
  return (
    <div className="flex flex-col mt-10">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Joined
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, userIdx) => (
                  <UserTableRow key={user._id} user={user} userIdx={userIdx} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserTableRow({ user, userIdx }) {
  const [isAdmin, setAdmin] = useState(user.role === "admin");
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    updatePermission();
  }, [isAdmin]);

  function handleChangeUserRole() {
    setAdmin((prevState) => !prevState);
  }

  async function updatePermission() {
    await axios.put(`${baseUrl}/api/account`, {
      _id: user._id,
      role: isAdmin ? "admin" : "user",
    });
  }

  return (
    <tr
      key={user._id}
      className={userIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.createdAt}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {isAdmin ? "admin" : "user"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Toggle
          user={user}
          isAdmin={isAdmin}
          handleChangeUserRole={handleChangeUserRole}
        />
      </td>
    </tr>
  );
}

export default Users;
