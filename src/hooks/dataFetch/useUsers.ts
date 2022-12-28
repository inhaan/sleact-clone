import { IUser } from '@typings/users';
import fetcher from '@utils/fetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';

const useUsers = () => {
  return useSWR<IUser | false, AxiosError>('/api/users', fetcher);
};

export default useUsers;
