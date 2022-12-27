import fetcher from '@utils/fetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';

interface IUser {
  something: unknown;
}

const useUsers = () => {
  return useSWR<IUser | false, AxiosError>('/api/users', fetcher);
};

export default useUsers;
