import { AppLocation } from '@typings/app';

const APP_LOCATION_STORAGE_KEY = 'location';

export const getLocationStorageKey = (email: string) => `${APP_LOCATION_STORAGE_KEY}/${email}`;

export const saveLocation = (email: string, location: AppLocation) => {
  localStorage.setItem(getLocationStorageKey(email), JSON.stringify(location));
};

export const getLocation = (email: string): AppLocation => {
  const data = localStorage.getItem(getLocationStorageKey(email));
  if (!data) {
    return {};
  }
  return JSON.parse(data);
};
