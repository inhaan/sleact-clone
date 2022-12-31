import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';

const useUsers = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<IUser | false, AxiosError>('/api/users', fetcher);
  return {
    user: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useUsers;
