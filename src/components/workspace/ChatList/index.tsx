import useDMChats from '@hooks/dataFetch/useDMChats';
import Chat from '@components/workspace/Chat';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ChatZone } from './styles';

interface ChatListProps {
  workspace: string;
  id: string;
}

const ChatList = ({ workspace, id }: ChatListProps) => {
  const { chats } = useDMChats(workspace, id);

  return (
    <ChatZone>
      <Scrollbars autoHide>
        {chats?.map((chat) => (
          <Chat key={chat.id} chat={chat} />
        ))}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
