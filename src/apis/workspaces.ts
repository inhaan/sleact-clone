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

export const inviteChannelMemberAsync = async (workspace: string, channel: string, email: string) => {
  const { data } = await axios.post<'ok'>(`/api/workspaces/${workspace}/channels/${channel}/members`, { email });
  return data;
};

export const chatWorkspaceDmAsync = async (workspace: string, id: string, content: string) => {
  const { data } = await axios.post<'ok'>(`/api/workspaces/${workspace}/dms/${id}/chats`, { content });
  return data;
};

export const chatWorkspaceChannelAsync = async (workspace: string, channel: string, content: string) => {
  const { data } = await axios.post<'ok'>(`/api/workspaces/${workspace}/channels/${channel}/chats`, { content });
  return data;
};

export const uploadDMImageAsync = async (workspace: string, id: string, formData: FormData) => {
  const { data } = await axios.post<'ok'>(`/api/workspaces/${workspace}/dms/${id}/images`, formData);
  return data;
};

export const uploadChannelImageAsync = async (workspace: string, channel: string, formData: FormData) => {
  const { data } = await axios.post<'ok'>(`/api/workspaces/${workspace}/channels/${channel}/images`, formData);
  return data;
};
