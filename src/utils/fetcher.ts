import axios from 'axios';

export const axiosFetcher = (url: string) => {
  return axios.get(url).then((res) => res.data);
};

export const localFetcher = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};
