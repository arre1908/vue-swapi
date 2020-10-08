import { apiClient, stripBaseUrl } from "@/apiService";

const filters = {
  filters: {
    cm(value) {
      if (isNaN(value)) return value;
      return `${value}cm`;
    },
    km(value) {
      if (isNaN(value)) return value;
      return `${parseInt(value).toLocaleString("en-US")}km`;
    },
    kg(value) {
      if (isNaN(value.replace(/,/g, ""))) return value;
      return `${value}kg`;
    },
    percent(value) {
      if (isNaN(value)) return value;
      return `${value}%`;
    },
    hours(value) {
      if (isNaN(value)) return value;
      return `${value} hours`;
    },
    days(value) {
      if (isNaN(value)) return value;
      return `${value} days`;
    },
    number(value) {
      if (isNaN(value)) return value;
      return parseInt(value).toLocaleString("en-US");
    },
    date(value) {
      let [y, m, d] = value.split("-");
      return `${m}/${d}/${y}`;
    }
  }
};

const infoMixins = {
  props: {
    itemProp: { type: Object, default: () => null }
  },
  data() {
    return {
      item: {},
      attributes: [],
      links: [],
      error: ""
    };
  },
  created() {
    if (this.itemProp) this.item = this.itemProp;
    else this.fetchData();
  },
  methods: {
    stripBaseUrl,
    fetchData() {
      this.error = "";
      return apiClient
        .get(this.$route.path)
        .then(response => {
          this.item = response.data;
        })
        .catch(err => {
          this.error = err;
        });
    },
    resolveLink(url, key) {
      apiClient.get(url).then(response => {
        this[key] = {
          url: stripBaseUrl(response.data.url),
          label: response.data.name
        };
      });
    }
  }
};

export { filters, infoMixins };
