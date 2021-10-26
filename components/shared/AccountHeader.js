function AccountHeader({ children }) {
  return (
    <div className="max-w-7xl mx-auto sm:px-2">
      <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {children}
        </h1>
      </div>
    </div>
  );
}

export default AccountHeader;
