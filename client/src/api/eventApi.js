import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/event"
    : `http://localhost:${process.env.port || 8000}/api/events`;

export default axios.create({ baseURL: url });
