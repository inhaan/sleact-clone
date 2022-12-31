import { AppLocation } from '@typings/app';
import { localFetcher } from '@utils/fetcher';
import { getLocationStorageKey } from '@utils/localStorage';
import useSWR from 'swr';
import useUsers from './useUsers';

export const useAppLocation = () => {
  const { user } = useUsers();
  const { data, error, isLoading, isValidating, mutate } = useSWR<AppLocation>(
    user ? getLocationStorageKey(user.email) : null,
    localFetcher,
  );
  return {
    location: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
