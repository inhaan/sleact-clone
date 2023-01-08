import useWorkspaceUsers from '@hooks/dataFetch/useWorkspaceUsers';
import { useParams } from 'react-router-dom';
import { Container, Header } from './styles';
import gravatar from 'gravatar';
import ChatBox from '@components/workspace/ChatBox';
import useInput from '@hooks/useInput';
import ChatList from '@components/workspace/ChatList';
import SkeletonizedImage from '@components/base/SkeletonizedImage';
import useDMChats from '@hooks/dataFetch/useDMChats';
import { chatWorkspaceDmAsync } from '@apis/workspaces';
import { useCallback, useEffect, useState } from 'react';
import useUsers from '@hooks/dataFetch/useUsers';
import useSocket from '@hooks/useSocket';
import { IDM } from '@typings/db';
import { ScrollToBottomEmitOption } from '@typings/app';

const DirectMessage = () => {
  const { workspace, id } = useParams();
  const { user } = useWorkspaceUsers(workspace, id);
  const { chats, mutate, setSize, isReachEnd } = useDMChats(workspace, id);
  const [chat, onChangeChat, setChat] = useInput('');
  const [scrollToBottomEmitter, setScrollToBottomEmitter] = useState<ScrollToBottomEmitOption>({});
  const { user: meUser } = useUsers();
  const [socket] = useSocket(workspace);

  const optimisticlyAddChat = async () => {
    if (user && meUser) {
      await mutate((prev) => {
        prev?.[0]?.unshift({
          id: (chats?.[0]?.id || 0) + 1,
          content: chat,
          SenderId: meUser.id,
          Sender: meUser,
          ReceiverId: user.id,
          Receiver: user,
          createdAt: new Date(),
        });

        return prev;
      });
      setScrollToBottomEmitter({});
    }
  };

  const onSubmitChat = async () => {
    if (workspace && id && chat && chat.trim()) {
      optimisticlyAddChat(); // 비동기지만 독립적으로 실행하기 위해 await하지 않는다
      await chatWorkspaceDmAsync(workspace, id, chat);
      setChat('');
      await mutate();
    }
  };

  const onMessage = useCallback(
    async (data: IDM) => {
      if (!user || !meUser || data.SenderId !== user.id || meUser.id === user.id) {
        return;
      }
      await mutate((prev) => {
        prev?.[0]?.unshift(data);
        return prev;
      });
      setScrollToBottomEmitter({ height: 200 });
    },
    [user, meUser, mutate],
  );

  useEffect(() => {
    socket.on('dm', onMessage);
    return () => {
      socket.off('dm', onMessage);
    };
  }, [socket, onMessage]);

  if (!user) {
    return null;
  }
  return (
    <Container>
      <Header>
        <SkeletonizedImage
          width={36}
          height={36}
          src={gravatar.url(user.email, { s: '36px', d: 'retro' })}
          alt={user.nickname}
        />
        <span>{user.nickname}</span>
      </Header>
      {workspace && id && (
        <ChatList
          workspace={workspace}
          chats={chats}
          setSize={setSize}
          isReachEnd={isReachEnd}
          scrollToBottomEmitter={scrollToBottomEmitter}
          refresher={`${workspace}/${id}`}
        />
      )}
      <ChatBox
        workspace={workspace}
        refresher={user.email}
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitChat={onSubmitChat}
      />
    </Container>
  );
};

export default DirectMessage;
