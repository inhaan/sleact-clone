import { useCallback, useEffect, useState } from 'react';
import useUsers from '@hooks/dataFetch/useUsers';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import gravatar from 'gravatar';
import { logoutAsync } from '@apis/users';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './styles';
import CreateWorkspaceModal from '@components/modals/CreateWorkspaceModal';
import { notifyError } from '@utils/toast';
import ProfileMenu from '@components/menus/ProfileMenu';
import WorkspaceLink from '@components/workspace/WorkspaceLink';
import WorkspaceMenu from '@components/menus/WorkspaceMenu';
import CreateChannelModal from '@components/modals/CreateChannelModal';
import { saveLocation } from '@utils/localStorage';
import InviteWorkspaceModal from '@components/modals/InviteWorksaceModal';
import ChannelList from '@components/workspace/ChannelList';
import DMList from '@components/workspace/DMList';
import useSocket from '@hooks/useSocket';
import useChannels from '@hooks/dataFetch/useChannels';

const Workspace = () => {
  const { workspace: workspaceUrl, channel, id } = useParams();
  const { user, mutate, isLoading } = useUsers();
  const { channels } = useChannels(workspaceUrl);
  const workspace = user ? user.Workspaces.find((x) => x.url === workspaceUrl) : null;
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [socket] = useSocket(workspaceUrl);

  useEffect(() => {
    // 현재 위치 저장
    if (user) {
      saveLocation(user.email, { workspace: workspaceUrl, channel, id });
    }
  }, [user, workspaceUrl, channel, id]);

  useEffect(() => {
    if (user && channels) {
      socket.emit('login', { id: user.id, channels });
    }
  }, [socket, user, channels]);

  const onToggleUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onCloseUserProfile = useCallback(() => {
    setShowUserMenu(false);
  }, []);

  const onClickLogout = useCallback(async () => {
    try {
      await logoutAsync();
      mutate(false, false);
    } catch (err) {
      notifyError(err, '채널을 생성하지 못했습니다');
    }
  }, [mutate]);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
  }, []);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onToggleWorkspaceMenu = useCallback(() => {
    setShowWorkspaceMenu((prev) => !prev);
  }, []);

  const onCloseWorkspaceMenu = useCallback(() => {
    setShowWorkspaceMenu(false);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
    setShowWorkspaceMenu(false);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
    setShowWorkspaceMenu(false);
  }, []);

  if (isLoading) {
    return null;
  }
  if (user === false) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Header>
        {user && (
          <RightMenu>
            <ProfileImg
              src={gravatar.url(user.email, { size: '28px', default: 'retro' })}
              alt={user.nickname}
              onClick={onToggleUserProfile}
            />
            <ProfileMenu show={showUserMenu} onCloseModal={onCloseUserProfile} onClickLogout={onClickLogout} />
          </RightMenu>
        )}
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {user?.Workspaces?.map((workspace) => (
            <WorkspaceLink key={workspace.id} workspace={workspace} />
          ))}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        {workspace && (
          <Channels>
            <WorkspaceName onClick={onToggleWorkspaceMenu}>{workspace?.name}</WorkspaceName>
            <MenuScroll>
              <WorkspaceMenu
                show={showWorkspaceMenu}
                style={{ top: 95, left: 80 }}
                onCloseModal={onCloseWorkspaceMenu}
                onClickLogout={onClickLogout}
                onClickAddChannel={onClickAddChannel}
                onClickInviteWorkspace={onClickInviteWorkspace}
              />
              <ChannelList workspace={workspaceUrl} />
              <DMList workspace={workspaceUrl} />
            </MenuScroll>
          </Channels>
        )}
        <Chats>
          <Outlet />
        </Chats>
      </WorkspaceWrapper>
      <CreateWorkspaceModal show={showCreateWorkspaceModal} onCloseModal={onCloseModal} />
      {workspace && (
        <>
          <CreateChannelModal workspaceUrl={workspace.url} show={showCreateChannelModal} onCloseModal={onCloseModal} />
          <InviteWorkspaceModal workspace={workspace.url} show={showInviteWorkspaceModal} onCloseModal={onCloseModal} />
        </>
      )}
    </div>
  );
};

export default Workspace;
