import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://swapi.dev/api/",
  headers: {
    Accept: "application/json"
  }
});

export default {
  films: (id = "") => apiClient.get(`films/${id && `${id}/`}`),
  characters: (id = "") => apiClient.get(`people/${id && `${id}/`}`)
};
