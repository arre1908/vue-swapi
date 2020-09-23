import axios from "axios";

const baseURL = "http://swapi.dev/api";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json"
  }
});

function stripBaseUrl(url) {
  if (baseURL.indexOf("http") === -1) {
    return url.replace(baseURL.replace("http", "https"), "");
  } else {
    return url.replace(baseURL, "");
  }
}

export { apiClient, stripBaseUrl };
