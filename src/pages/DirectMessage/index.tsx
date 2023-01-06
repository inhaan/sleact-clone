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

const DirectMessage = () => {
  const { workspace, id } = useParams();
  const { user } = useWorkspaceUsers(workspace, id);
  const { mutate } = useDMChats(workspace, id);
  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitChat = async () => {
    if (workspace && id && chat && chat.trim()) {
      await chatWorkspaceDmAsync(workspace, id, chat);
      setChat('');
      mutate();
    }
  };

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
      {workspace && id && <ChatList workspace={workspace} id={id} />}
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
