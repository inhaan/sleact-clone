import { IChat } from '@typings/db';
import { axiosFetcher } from '@utils/fetcher';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

const PER_PAGE = 20;

const useChannelChat = (workspace?: string, channel?: string) => {
  const getKey: SWRInfiniteKeyLoader = useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && (!previousPageData.length || previousPageData.length < PER_PAGE)) {
        return null;
      }
      return (
        workspace &&
        channel &&
        `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=${PER_PAGE}&page=${pageIndex + 1}`
      );
    },
    [workspace, channel],
  );

  const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite<IChat[], AxiosError>(
    getKey,
    axiosFetcher,
  );

  return {
    chats: data?.flat(),
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
    isReachEnd: (data && data[data.length - 1].length < PER_PAGE) ?? false,
  };
};

export default useChannelChat;
