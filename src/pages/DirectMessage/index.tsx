import useWorkspaceUsers from '@hooks/dataFetch/useWorkspaceUsers';
import { useParams } from 'react-router-dom';
import { Container, Header } from './styles';
import gravatar from 'gravatar';
import ChatBox from '@components/workspace/ChatBox';
import useInput from '@hooks/useInput';
import { useCallback } from 'react';

const DirectMessage = () => {
  const { workspace, id } = useParams();
  const { user } = useWorkspaceUsers(workspace, id);
  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitChat = useCallback(() => {
    console.log(chat);
    setChat('');
  }, [chat]);

  if (!user) {
    return null;
  }
  return (
    <Container>
      <Header>
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
        <span>{user.nickname}</span>
      </Header>
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitChat={onSubmitChat} />
    </Container>
  );
};

export default DirectMessage;
