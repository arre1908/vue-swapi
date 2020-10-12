import { apiClient } from "@/apiService";

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
    roman(value) {
      const roman = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI" };
      return roman[value];
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
    if (this.itemProp) this.handleData(this.itemProp);
    else this.fetchData();
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
    }
  }
};

export { filters, infoMixins };
