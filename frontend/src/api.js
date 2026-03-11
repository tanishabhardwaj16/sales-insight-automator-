import axios from "axios";

const API = axios.create({
  baseURL: "https://sales-insight-automator-w0i1.onrender.com/"
});

export default API;