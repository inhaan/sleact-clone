import { IUser } from '@typings/db';
import { axiosFetcher } from '@utils/fetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';

const useUsers = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<IUser | false, AxiosError>(
    '/api/users',
    axiosFetcher,
  );
  return {
    user: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useUsers;
