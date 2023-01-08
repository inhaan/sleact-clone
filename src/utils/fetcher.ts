import axios from 'axios';

export const axiosFetcher = (url: string) => {
  return axios.get(url).then((res) => res.data);
};

export const localFetcher = (key?: string) => {
  return (storageKey: string) => {
    const strData = localStorage.getItem(storageKey);
    if (!strData) {
      return null;
    }
    const data = JSON.parse(strData);
    return key ? data[key] : data;
  };
};
