import { IWorkspace } from '@typings/db';
import axios from 'axios';

export const createWorkspaceAsync = async (workspace: string, url: string) => {
  const { data } = await axios.post<IWorkspace>('/api/workspaces', { workspace, url });
  return data;
};

export const inviteWorkspaceMemberAsync = async (workspace: string, email: string) => {
  const { data } = await axios.post<'ok'>(`/api/workspaces/${workspace}/members`, { email });
  return data;
};