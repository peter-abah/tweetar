export interface Params {
  [index: string]: string;
}

const stringifyParams = (params: Params) => {
  const paramsList = Object.entries(params).map(
    ([key, value]) => `${key}=${value}`
  );

  return `?${paramsList.join('&')}`;
};

export default stringifyParams;
