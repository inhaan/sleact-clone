import { IUser } from '@typings/db';
import { axiosFetcher } from '@utils/fetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';

const useWorkspaceMembers = (workspace?: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<IUser[], AxiosError>(
    workspace && `/api/workspaces/${workspace}/members`,
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

export default useWorkspaceMembers;
