const indexBy = (fn, arr) => {
  return arr.reduce((result, item) => {
    result[fn(item)] = item;

    return result;
  }, {});
};

export default indexBy;
