import InviteChannelModal from '@components/modals/InviteChannelModal';
import ChatBox from '@components/workspace/ChatBox';
import ChatList from '@components/workspace/ChatList';
import useWorkspaceChannelMembers from '@hooks/dataFetch/useWorkspaceChannelMembers';
import useInput from '@hooks/useInput';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header } from './styles';

const Channel = () => {
  const { workspace, channel } = useParams();
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [chat, onChangeChat, setChat] = useInput('');
  const { members } = useWorkspaceChannelMembers(workspace, channel);

  const onSubmitChat = async () => {
    if (workspace && channel && chat && chat.trim()) {
      console.log(chat);
      // await chatWorkspaceChannelAsync(workspace, channel, chat);
      setChat('');
    }
  };

  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  }, []);

  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  }, []);

  return (
    <Container>
      <Header>
        <span>#{channel}</span>
        <div className="header-right">
          <span></span>
          <button className="c-button-unstyled p-ia__view_header__button" onClick={onClickInviteChannel}>
            <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" />
          </button>
        </div>
      </Header>
      {members?.map((member) => (
        <div key={member.id}>{member.nickname}</div>
      ))}
      <ChatList />
      <ChatBox refresher={channel} chat={chat} onChangeChat={onChangeChat} onSubmitChat={onSubmitChat} />
      {workspace && channel && (
        <InviteChannelModal
          workspace={workspace}
          channel={channel}
          show={showInviteChannelModal}
          onCloseModal={onCloseModal}
        />
      )}
    </Container>
  );
};

export default Channel;
