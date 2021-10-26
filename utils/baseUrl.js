const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://mern-ecomm-85zhuu9bz-denis-rim.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
