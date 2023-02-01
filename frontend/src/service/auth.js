import axios from "axios";
const auth = axios.create({
  baseURL: "http://localhost:5000/auth",
});
export default auth;
