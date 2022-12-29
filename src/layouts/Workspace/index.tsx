import { MouseEvent, useCallback, useState } from 'react';
import useUsers from '@hooks/dataFetch/useUsers';
import { Link, Navigate, Outlet } from 'react-router-dom';
import gravatar from 'gravatar';
import { logoutAsync } from '@apis/users';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './styles';
import Menu from '@components/Menu';

const Workspace = () => {
  const { data: user, mutate } = useUsers();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const onClickUserProfile = () => {
    setShowUserMenu((prev) => !prev);
  };

  const onCloseUserProfile = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowUserMenu(false);
    }
  };

  const onClickLogout = useCallback(async () => {
    await logoutAsync();
    mutate(false, false);
  }, []);

  if (user === false) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Header>
        <RightMenu>
          {user && (
            <>
              <ProfileImg
                src={gravatar.url(user.email, { size: '28px', default: 'retro' })}
                alt={user.nickname}
                onClick={onClickUserProfile}
              />
              {showUserMenu && (
                <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                  <ProfileModal>
                    <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
                    <div>
                      <span id="profile-name">{user.nickname}</span>
                      <span id="profile-active">Active</span>
                    </div>
                  </ProfileModal>
                  <LogOutButton onClick={onClickLogout}>로그아웃</LogOutButton>
                </Menu>
              )}
            </>
          )}
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          <Link to="/">
            <WorkspaceButton>워크1</WorkspaceButton>
          </Link>
          <Link to="/">
            <WorkspaceButton>워크2</WorkspaceButton>
          </Link>
          <AddButton>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll></MenuScroll>
        </Channels>
        <Chats>
          <Outlet />
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
