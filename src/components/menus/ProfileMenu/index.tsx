import Menu from '@components/base/Menu';
import { MouseEvent, useCallback } from 'react';
import gravatar from 'gravatar';
import { LogOutButton, ProfileModal } from './styles';
import useUsers from '@hooks/dataFetch/useUsers';
import SkeletonizedImage from '@components/base/SkeletonizedImage';

interface ProfileMenuProps {
  show?: boolean;
  onCloseModal?(): void;
  onClickLogout?(): void;
}

const ProfileMenu = ({ show, onCloseModal, onClickLogout }: ProfileMenuProps) => {
  const { user } = useUsers();

  const onCloseModalInner = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onCloseModal?.();
      }
    },
    [onCloseModal],
  );

  if (!user) {
    return null;
  }
  return (
    <Menu style={{ right: 0, top: 38 }} show={show} onCloseModal={onCloseModalInner}>
      <ProfileModal>
        <SkeletonizedImage
          width={36}
          height={36}
          src={gravatar.url(user.email, { s: '36px', d: 'retro' })}
          alt={user.nickname}
        />
        <div>
          <span id="profile-name">{user.nickname}</span>
          <span id="profile-active">Active</span>
        </div>
      </ProfileModal>
      <LogOutButton onClick={onClickLogout}>로그아웃</LogOutButton>
    </Menu>
  );
};

export default ProfileMenu;
