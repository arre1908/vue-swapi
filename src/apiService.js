import axios from "axios";

const baseURL = "https://swapi.dev/api";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json"
  }
});

function stripBaseUrl(url, append = "") {
  // Remove URL
  let strippedUrl = url.replace(/https?:\/\/(www\.)?swapi\.dev\/api/, "");

  // Remove trailing "/" and concat 'append' string
  return strippedUrl.replace(/\/$/, "").concat(append);
}

export { apiClient, stripBaseUrl };
