import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "/users"
    : `http://localhost:${process.env.port || 8000}/users`;

export default axios.create({ baseURL: url });
