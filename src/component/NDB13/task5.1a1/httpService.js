import axios from "axios";
import auth from "./authservice";
const baseURL = "http://localhost:2410";
function get(url) {
  //return axios.get(baseURL + url);
  let token = auth.getToken();
  return axios.get(baseURL + url, {
    headers: { Authorization: "bearer " + token },
  });
}
function post(url, obj) {
  return axios.post(baseURL + url, obj);
}

export default {
  get,
  post,
};
