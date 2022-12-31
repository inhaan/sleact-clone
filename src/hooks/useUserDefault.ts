import { IWorkspace } from '@typings/db';
import useChannels from './dataFetch/useChannels';
import useUsers from './dataFetch/useUsers';

const useUserDefault = (workspace?: IWorkspace) => {
  if (!workspace) {
    const { user } = useUsers();
    workspace = user ? user.Workspaces?.[0] : undefined;
  }
  const { channels } = useChannels(workspace?.url);
  const channel = channels ? channels[0] : undefined;
  return {
    workspace,
    channel,
  };
};

export default useUserDefault;
