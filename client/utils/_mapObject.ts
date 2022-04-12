const _mapObject = (f, items, index) => {
  const res = [];
  for (const key in items) {
    res.push(f(key, items, index));
  }
  return res;
};

export default _mapObject;
