import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/users"
    : `http://localhost:${process.env.port || 8000}/api/users`;

export default axios.create({ baseURL: url });
