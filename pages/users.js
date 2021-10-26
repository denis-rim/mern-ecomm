import AccountLayout from "../components/Account/AccountLayout";

function Users({ user }) {
  return (
    <AccountLayout user={user}>
      <div>Users</div>
    </AccountLayout>
  );
}

export default Users;
