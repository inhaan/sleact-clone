import { useEffect } from 'react';
import io from 'socket.io-client';

class SocketData {
  private timerId?: NodeJS.Timeout;
  socket: SocketIOClient.Socket;

  constructor(public workspace: string, onDisconnect?: (workspace: string) => void) {
    const socket = io.connect(`/ws-${workspace}`, { transports: ['websocket'] });
    socket.disconnect = function (this: SocketData, orgFunc: () => SocketIOClient.Socket) {
      this.timerId = setTimeout(() => {
        orgFunc.call(socket);
        onDisconnect?.(workspace);
      }, 100);
      return socket;
    }.bind(this, socket.disconnect);

    this.socket = socket;
  }

  refresh() {
    clearTimeout(this.timerId);
    this.timerId = undefined;
  }
}

class SocketManager {
  private socketDatas: { [key: string]: SocketData } = {};

  hasSocket(workspace: string) {
    return !!this.socketDatas[workspace];
  }

  getSocket(workspace: string) {
    if (!this.socketDatas[workspace]) {
      this.socketDatas[workspace] = new SocketData(workspace, () => delete this.socketDatas[workspace]);
    } else {
      this.socketDatas[workspace].refresh();
    }
    return this.socketDatas[workspace];
  }
}

const sm = new SocketManager();

const useSocket = (workspace?: string) => {
  useEffect(() => {
    return () => {
      if (workspace) {
        sm.getSocket(workspace)?.socket.disconnect();
      }
    };
  }, [workspace]);

  if (!workspace) {
    return [];
  }
  return [sm.getSocket(workspace).socket];
};

export default useSocket;
