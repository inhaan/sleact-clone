import { IChannel } from '@typings/db';
import { axiosFetcher } from '@utils/fetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';

const useChannel = (workspace?: string, channel?: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<IChannel, AxiosError>(
    workspace && channel && `/api/workspaces/${workspace}/channels/${channel}`,
    axiosFetcher,
  );
  return {
    channel: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useChannel;
