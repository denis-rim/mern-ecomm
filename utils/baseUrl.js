const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://deployment-url.com"
    : "http://localhost:3000";

export default baseUrl;
