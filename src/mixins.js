import { apiClient, stripBaseUrl } from "@/apiService";

const filters = {
  filters: {
    meters(value) {
      if (!value) return "";
      value = value.toString();

      if (isNaN(value)) {
        return value;
      } else {
        return value / 100;
      }
    }
  }
};

const infoMixins = {
  props: {
    itemProp: { type: Object, default: () => null },
    attributesProp: { type: Array, default: () => null },
    linksProp: { type: Array, default: () => null }
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
    if (this.attributesProp) this.attributes = this.attributesProp;
    if (this.linksProp) this.links = this.linksProp;

    if (this.itemProp) this.item = this.itemProp;
    else {
      this.fetchData();
    }
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
