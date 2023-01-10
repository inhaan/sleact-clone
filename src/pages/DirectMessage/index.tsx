import useWorkspaceUsers from '@hooks/dataFetch/useWorkspaceUsers';
import { useParams } from 'react-router-dom';
import { Container, DragOver, Header } from './styles';
import gravatar from 'gravatar';
import ChatBox from '@components/workspace/ChatBox';
import useInput from '@hooks/useInput';
import ChatList from '@components/workspace/ChatList';
import SkeletonizedImage from '@components/base/SkeletonizedImage';
import useDMChats from '@hooks/dataFetch/useDMChats';
import { chatWorkspaceDmAsync, uploadDMImageAsync } from '@apis/workspaces';
import { DragEvent, useCallback, useEffect, useState } from 'react';
import useUsers from '@hooks/dataFetch/useUsers';
import useSocket from '@hooks/useSocket';
import { IDM } from '@typings/db';
import { ScrollToBottomEmitOption } from '@typings/app';
import UploadCover from './UploadCover';
import _ from 'lodash';
import axios from 'axios';
import { toastError } from '@utils/toast';

const DirectMessage = () => {
  const { workspace, id } = useParams();
  const { user } = useWorkspaceUsers(workspace, id);
  const { chats, mutate, setSize, isReachEnd } = useDMChats(workspace, id);
  const [chat, onChangeChat, setChat] = useInput('');
  const [scrollToBottomEmitter, setScrollToBottomEmitter] = useState<ScrollToBottomEmitOption>({});
  const { user: meUser } = useUsers();
  const [socket] = useSocket(workspace);
  const [isDragOver, setIsDragOver] = useState(false);

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

  const releaseDragOver = useCallback(
    _.debounce(() => {
      setIsDragOver(false);
    }, 100),
    [],
  );

  const onDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
      releaseDragOver();
    },
    [releaseDragOver],
  );

  const getFormData = (dataTransfer: DataTransfer) => {
    const formData = new FormData();
    if (dataTransfer.items) {
      for (let i = 0; i < dataTransfer.items.length; i++) {
        if (dataTransfer.items[i].kind === 'file') {
          const file = dataTransfer.items[i].getAsFile();
          if (file) {
            if (!file.type.startsWith('image/')) {
              toastError('이미지 파일을 업로드해 주세요');
              return null;
            }
            formData.append('image', file);
          }
        }
      }
    } else {
      for (let i = 0; i < dataTransfer.files.length; i++) {
        const file = dataTransfer.files[i];
        if (!file.type.startsWith('image/')) {
          toastError('이미지 파일을 업로드해 주세요');
          return null;
        }
        formData.append('image', file);
      }
    }
    return formData;
  };

  const onDrop = async (e: DragEvent) => {
    e.preventDefault();
    if (!workspace || !id) {
      return;
    }
    const formData = getFormData(e.dataTransfer);
    if (!formData) {
      return;
    }

    await uploadDMImageAsync(workspace, id, formData);
    setIsDragOver(false);
    mutate();
  };

  if (!user || !workspace || !id) {
    return null;
  }
  return (
    <Container onDragOver={onDragOver} onDrop={onDrop}>
      <Header>
        <SkeletonizedImage
          width={36}
          height={36}
          src={gravatar.url(user.email, { s: '36px', d: 'retro' })}
          alt={user.nickname}
        />
        <span>{user.nickname}</span>
      </Header>
      <ChatList
        workspace={workspace}
        chats={chats}
        setSize={setSize}
        isReachEnd={isReachEnd}
        scrollToBottomEmitter={scrollToBottomEmitter}
        refresher={`${workspace}/${id}`}
      />
      <ChatBox
        workspace={workspace}
        refresher={user.email}
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitChat={onSubmitChat}
      />
      {isDragOver && <DragOver>업로드</DragOver>}
    </Container>
  );
};

export default DirectMessage;
