import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://swapi.dev/api/",
  headers: {
    Accept: "application/json"
  }
});

function getRouteId(url) {
  let cleanUrl = url.replace(/\/$/, ""); // remove trailing '/'
  return cleanUrl.split("/").pop();
}

const api = {
  films: (id = "") => apiClient.get(`films/${id && `${id}/`}`),
  characters: (id = "") => apiClient.get(`people/${id && `${id}/`}`)
};

export { apiClient, getRouteId };

export default api;
