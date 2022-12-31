import { IChannel } from '@typings/db';
import axios from 'axios';

export const createChannelAsync = async (workspace: string, channel: string) => {
  const { data } = await axios.post<IChannel>(`/api/workspaces/${workspace}/channels`, { name: channel });
  return data;
};
