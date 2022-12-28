import { useCallback } from 'react';
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
  RightMenu,
  WorkspaceButton,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './styles';

const Workspace = () => {
  const { data: user, mutate } = useUsers();

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
          <span>
            {user && (
              <>
                <ProfileImg src={gravatar.url(user.email, { size: '28px', default: 'retro' })} alt={user.nickname} />
                <LogOutButton onClick={onClickLogout}>로그아웃</LogOutButton>
              </>
            )}
          </span>
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
