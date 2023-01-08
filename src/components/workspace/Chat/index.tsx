import { IDM } from '@typings/db';
import gravatar from 'gravatar';
import { memo, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import regexifyString from 'regexify-string';
import { ChatWrapper } from './styles';
import { Link } from 'react-router-dom';

interface ChatProps {
  chat: IDM;
  workspace: string;
}

const Chat = ({ chat, workspace }: ChatProps) => {
  const user = chat.Sender;

  const getLineElement = useCallback(
    (line: string) => {
      return regexifyString({
        input: line,
        pattern: /@\[(.+?)\]\((\d+?)\)/g,
        decorator(match, index, result) {
          return (
            <Link key={match + index} to={`/workspace/${workspace}/dm/${result?.[2]}`}>
              @{result?.[1]}
            </Link>
          );
        },
      });
    },
    [workspace],
  );

  const content = useMemo(() => {
    const lines = chat.content.split('\n');
    const lineElements = lines.map(getLineElement);
    return lineElements.map((lineElement, index) => {
      if (index === lines.length - 1) {
        return <span key={index}>{lineElement}</span>;
      }
      return (
        <span key={index}>
          <span>{lineElement}</span>
          <br />
        </span>
      );
    });
  }, [chat.content, getLineElement]);

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
        <p>{content}</p>
      </div>
    </ChatWrapper>
  );
};

export default memo(Chat);
