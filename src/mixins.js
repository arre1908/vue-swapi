import { apiClient } from "@/apiService";

const infoMixins = {
  data() {
    return {
      item: {},
      attributes: [],
      links: [],
      error: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = "";
      return apiClient
        .get(this.$route.path)
        .then(response => {
          this.handleData(response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            this.$router.replace("/404");
          } else {
            this.error = error;
          }
        });
    },
    handleData(data) {
      this.item = data;
    },
    format(value, units = "", sep = " ") {
      let num = value.replace(/,/g, "");

      if (isNaN(num)) return value;

      return `${Number(num).toLocaleString("en-US")}${sep}${units}`;
    }
  }
};

export { infoMixins };
