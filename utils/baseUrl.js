const baseUrl =
  process.env.NODE_ENV === "production"
    ? "reactnextshop-ar.now.sh"
    : "http://localhost:3000";

export default baseUrl;
