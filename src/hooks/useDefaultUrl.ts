import { useAppLocation } from './dataFetch/useAppLocation';
import useUsers from './dataFetch/useUsers';

const useDefaultLocation = (): string => {
  let workspace: string | undefined;
  let channel: string | undefined;
  let id: string | undefined;

  const { location } = useAppLocation();
  const { user } = useUsers();

  if (location) {
    workspace = location.workspace;
    channel = location.channel;
    id = location.id;
  } else {
    const workspaceObj = user ? user.Workspaces?.[0] : undefined;
    workspace = workspaceObj?.url;
  }

  let url = '/';
  if (!workspace) {
    return url;
  }
  url += `workspace/${workspace}/`;
  if (!channel && !id) {
    return url;
  }
  if (channel) {
    return url + `channel/${channel}/`;
  }
  return url + `dm/${id}/`;
};

export default useDefaultLocation;
