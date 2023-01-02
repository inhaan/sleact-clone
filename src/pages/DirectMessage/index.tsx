import useWorkspaceUsers from '@hooks/dataFetch/useWorkspaceUsers';
import { useParams } from 'react-router-dom';
import { Container, Header } from './styles';
import gravatar from 'gravatar';
import ChatBox from '@components/workspace/ChatBox';
import useInput from '@hooks/useInput';
import ChatList from '@components/workspace/ChatList';

const DirectMessage = () => {
  const { workspace, id } = useParams();
  const { user } = useWorkspaceUsers(workspace, id);
  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitChat = async () => {
    if (workspace && id && chat && chat.trim()) {
      console.log(chat);
      // await chatWorkspaceDmAsync(workspace, id, chat);
      setChat('');
    }
  };

  if (!user) {
    return null;
  }
  return (
    <Container>
      <Header>
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
        <span>{user.nickname}</span>
      </Header>
      <ChatList />
      <ChatBox refresher={user.email} chat={chat} onChangeChat={onChangeChat} onSubmitChat={onSubmitChat} />
    </Container>
  );
};

export default DirectMessage;
