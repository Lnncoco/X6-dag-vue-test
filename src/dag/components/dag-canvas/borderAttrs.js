const defaultOptions = {
  stroke: "#108ee9",
  fill: "#fff",
};

const options = {
  "algo-node": {
    stroke: "#108ee9",
    fill: "#fff",
  },
  "vue-shape": {},
};

const find = (name) => {
  if (options[name]) return options[name];
  return defaultOptions;
};

export default find;
