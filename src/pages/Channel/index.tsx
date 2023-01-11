import { chatWorkspaceChannelAsync, uploadChannelImageAsync } from '@apis/workspaces';
import { DragOver } from '@components/common/styles';
import InviteChannelModal from '@components/modals/InviteChannelModal';
import ChatBox from '@components/workspace/ChatBox';
import ChatList from '@components/workspace/ChatList';
import useChannel from '@hooks/dataFetch/useChannel';
import useChannelChat from '@hooks/dataFetch/useChannelChats';
import useUsers from '@hooks/dataFetch/useUsers';
import useWorkspaceChannelMembers from '@hooks/dataFetch/useWorkspaceChannelMembers';
import useDragOver from '@hooks/useImageUpload';
import useInput from '@hooks/useInput';
import useSocket from '@hooks/useSocket';
import { ScrollToBottomEmitOption } from '@typings/app';
import { IChat } from '@typings/db';
import { getImageFormData } from '@utils/file';
import { DragEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header } from './styles';

const Channel = () => {
  const { workspace, channel } = useParams();
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [chat, onChangeChat, setChat] = useInput('');
  const { members, mutate: mutateMembers } = useWorkspaceChannelMembers(workspace, channel);
  const { chats, mutate: mutateChat, setSize, isReachEnd } = useChannelChat(workspace, channel);
  const [scrollToBottomEmitter, setScrollToBottomEmitter] = useState<ScrollToBottomEmitOption>({});
  const [socket] = useSocket(workspace);
  const { channel: channelData } = useChannel(workspace, channel);
  const { user } = useUsers();
  const [isDragOver, setIsDragOver, onDragOver] = useDragOver();

  const optimisticlyAddChat = async () => {
    if (channelData && user) {
      await mutateChat((prev) => {
        prev?.[0]?.unshift({
          id: (chats?.[0]?.id || 0) + 1,
          content: chat,
          ChannelId: channelData?.id,
          Channel: channelData,
          UserId: user.id,
          User: user,
          createdAt: new Date(),
        });
        return prev;
      });
      setScrollToBottomEmitter({});
    }
  };

  const onSubmitChat = async () => {
    if (workspace && channel && chat && chat.trim()) {
      optimisticlyAddChat(); // 비동기지만 독립적으로 실행하기 위해 await하지 않는다
      await chatWorkspaceChannelAsync(workspace, channel, chat);
      setChat('');
      await mutateChat();
    }
  };

  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
    mutateMembers();
  }, [mutateMembers]);

  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  }, []);

  const onMessage = useCallback(
    async (data: IChat) => {
      if (!channelData || data.ChannelId !== channelData.id) {
        return;
      }
      await mutateChat((prev) => {
        prev?.[0]?.unshift(data);
        return prev;
      });
      setScrollToBottomEmitter({ height: 200 });
    },
    [channelData, mutateChat],
  );

  useEffect(() => {
    socket.on('message', onMessage);
    return () => {
      socket.off('message', onMessage);
    };
  }, [socket, onMessage]);

  const onDrop = async (e: DragEvent) => {
    e.preventDefault();
    if (!workspace || !channel) {
      return;
    }
    const formData = getImageFormData(e.dataTransfer);
    if (!formData) {
      return;
    }

    await uploadChannelImageAsync(workspace, channel, formData);
    setIsDragOver(false);
    await mutateChat();
    setScrollToBottomEmitter({});
  };

  if (!members || !workspace || !channel) {
    return null;
  }
  return (
    <Container onDragOver={onDragOver} onDrop={onDrop}>
      <Header>
        <span>#{channel}</span>
        <div className="header-right">
          <span>{members.length}</span>
          <button className="c-button-unstyled p-ia__view_header__button" onClick={onClickInviteChannel}>
            <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" />
          </button>
        </div>
      </Header>
      <ChatList
        workspace={workspace}
        chats={chats}
        setSize={setSize}
        isReachEnd={isReachEnd}
        scrollToBottomEmitter={scrollToBottomEmitter}
        refresher={`${workspace}/${channel}`}
      />
      <ChatBox
        workspace={workspace}
        refresher={channel}
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitChat={onSubmitChat}
      />
      <InviteChannelModal
        workspace={workspace}
        channel={channel}
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
      />
      {isDragOver && <DragOver>업로드</DragOver>}
    </Container>
  );
};

export default Channel;
