import { ReactNode, useCallback } from 'react';
import axios from 'axios';
import useUsers from '@hooks/dataFetch/useUsers';
import { Navigate } from 'react-router-dom';

interface WorkspaceProps {
  children: ReactNode;
}

const Workspace = ({ children }: WorkspaceProps) => {
  const { data, mutate } = useUsers();

  const onClickLogout = useCallback(async () => {
    await axios.post('/api/users/logout');
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
