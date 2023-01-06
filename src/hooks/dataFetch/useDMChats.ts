import { IDM } from '@typings/db';
import { axiosFetcher } from '@utils/fetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';

const useDMChats = (workspace?: string, id?: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<IDM[], AxiosError>(
    workspace && id && `/api/workspaces/${workspace}/dms/${id}/chats?perPage=${20}&page=${1}`,
    axiosFetcher,
  );
  return {
    chats: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useDMChats;
