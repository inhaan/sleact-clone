import { IUser } from '@typings/db';
import { axiosFetcher } from '@utils/fetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';

const useWorkspaceUsers = (workspace?: string, id?: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<IUser, AxiosError>(
    workspace && id && `/api/workspaces/${workspace}/users/${id}`,
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

export default useWorkspaceUsers;
