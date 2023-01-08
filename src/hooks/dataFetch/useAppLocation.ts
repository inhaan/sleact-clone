import { AppLocation } from '@typings/app';
import { localFetcher } from '@utils/fetcher';
import { getStorageKey } from '@utils/localStorage';
import useSWR from 'swr';
import useUsers from './useUsers';

export const useAppLocation = () => {
  const { user } = useUsers();
  const { data, error, isLoading, isValidating, mutate } = useSWR<AppLocation>(
    user ? getStorageKey(user.email) : null,
    localFetcher('location'),
  );
  return {
    location: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
