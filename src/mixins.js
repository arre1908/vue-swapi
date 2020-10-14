import { apiClient } from "@/apiService";

const infoMixins = {
  data() {
    return {
      item: {},
      attributes: [],
      links: [],
      error: ""
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
        .catch(err => {
          this.error = err;
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
