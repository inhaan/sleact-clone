import { IUser } from '@typings/users';
import axios from 'axios';

export const saveUserAsync = async (email: string, nickname: string, password: string) => {
  await axios.post('/api/users', { email, nickname, password });
};

export const loginAsync = async (email: string, password: string) => {
  const { data } = await axios.post<IUser>('/api/users/login', { email, password });
  return data;
};

export const logoutAsync = async () => {
  await axios.post('/api/users/logout');
};
