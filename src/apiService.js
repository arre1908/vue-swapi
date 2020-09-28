import axios from "axios";

const baseURL = "https://swapi.dev/api";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json"
  }
});

function stripBaseUrl(url) {
  if (url.slice(0, 5) === "https") {
    return url.replace(baseURL, "");
  } else {
    return url.replace(baseURL.replace("https", "http"), "");
  }
}

export { apiClient, stripBaseUrl };
