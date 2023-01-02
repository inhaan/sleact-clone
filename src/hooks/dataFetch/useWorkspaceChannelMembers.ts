import { IUser } from '@typings/db';
import { axiosFetcher } from '@utils/fetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';

const useWorkspaceChannelMembers = (workspace?: string, channel?: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<IUser[], AxiosError>(
    workspace && channel && `/api/workspaces/${workspace}/channels/${channel}/members`,
    axiosFetcher,
  );
  return {
    members: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useWorkspaceChannelMembers;
