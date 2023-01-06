import { IDM } from '@typings/db';
import gravatar from 'gravatar';
import { memo } from 'react';
import dayjs from 'dayjs';
import { ChatWrapper } from './styles';

interface ChatProps {
  chat: IDM;
}

const Chat = ({ chat }: ChatProps) => {
  const user = chat.Sender;
  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { size: '36px', default: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(chat.createdAt).format('h:mm A')}</span>
        </div>
        <p>{chat.content}</p>
      </div>
    </ChatWrapper>
  );
};

export default memo(Chat);
