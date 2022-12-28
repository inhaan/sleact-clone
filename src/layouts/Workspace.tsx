import { ReactNode, useCallback } from 'react';
import useUsers from '@hooks/dataFetch/useUsers';
import { Navigate } from 'react-router-dom';
import { logoutAsync } from '@apis/users';

interface WorkspaceProps {
  children: ReactNode;
}

const Workspace = ({ children }: WorkspaceProps) => {
  const { data, mutate } = useUsers();

  const onClickLogout = useCallback(async () => {
    await logoutAsync();
    mutate(false, false);
  }, []);

  if (data === false) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <button onClick={onClickLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
