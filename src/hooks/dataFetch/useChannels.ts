import { IChannel } from '@typings/db';
import { axiosFetcher } from '@utils/fetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';

const useChannels = (workspace?: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<IChannel[], AxiosError>(
    workspace && `/api/workspaces/${workspace}/channels`,
    axiosFetcher,
  );
  return {
    channels: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useChannels;
