import Menu from '@components/base/Menu';
import { CSSProperties, MouseEvent, useCallback } from 'react';
import { WorkspaceModal } from './styles';

interface WorkspaceMenuProps {
  show?: boolean;
  style?: CSSProperties;
  onCloseModal?(): void;
  onClickLogout?(): void;
  onClickAddChannel?(): void;
  onClickInviteWorkspace?(): void;
}

const WorkspaceMenu = ({
  show,
  style,
  onCloseModal,
  onClickLogout,
  onClickAddChannel,
  onClickInviteWorkspace,
}: WorkspaceMenuProps) => {
  const onCloseModalInner = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onCloseModal?.();
      }
    },
    [onCloseModal],
  );

  return (
    <Menu show={show} onCloseModal={onCloseModalInner} style={style}>
      <WorkspaceModal>
        <h2>Sleact</h2>
        <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
        <button onClick={onClickAddChannel}>채널 만들기</button>
        <button onClick={onClickLogout}>로그아웃</button>
      </WorkspaceModal>
    </Menu>
  );
};

export default WorkspaceMenu;
