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

export { filters };
