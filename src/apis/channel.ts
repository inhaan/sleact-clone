import { IChannel, IWorkspace } from '@typings/db';
import axios from 'axios';

export const createWorkspaceAsync = async (workspace: string, url: string) => {
  const { data } = await axios.post<IWorkspace>('/api/workspaces', { workspace, url });
  return data;
};

export const createChannelAsync = async (workspace: string, channel: string) => {
  const { data } = await axios.post<IChannel>(`/api/workspaces/${workspace}/channels`, { name: channel });
  return data;
};
