import { AppLocation, EmojiData } from '@typings/app';

const APP_STORAGE_KEY = 'sleact-clone';

export const getStorageKey = (email: string) => `${APP_STORAGE_KEY}/${email}`;

export const saveLocation = (email: string, location: AppLocation) => {
  const storageKey = getStorageKey(email);
  const prevStrData = localStorage.getItem(storageKey);
  const prevData = prevStrData ? JSON.parse(prevStrData) : {};
  localStorage.setItem(getStorageKey(email), JSON.stringify({ ...prevData, location }));
};

export const saveEmojis = (email: string, emojis: EmojiData[]) => {
  const storageKey = getStorageKey(email);
  const prevStrData = localStorage.getItem(storageKey);
  const prevData = prevStrData ? JSON.parse(prevStrData) : {};
  localStorage.setItem(getStorageKey(email), JSON.stringify({ ...prevData, emojis }));
};
