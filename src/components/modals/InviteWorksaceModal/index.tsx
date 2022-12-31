import { inviteWorkspaceMemberAsync as inviteWorkspaceAsync } from '@apis/workspaces';
import Modal from '@components/base/Modal';
import { Button, Input, Label } from '@components/common/styles';
import useWorkspaceMembers from '@hooks/dataFetch/useWorkspaceMembers';
import useInput from '@hooks/useInput';
import { notifyError, toastError } from '@utils/toast';
import { FormEvent, MouseEvent, useCallback } from 'react';

interface InviteWorkspaceModalProps {
  show?: boolean;
  onCloseModal?(): void;
  workspace: string;
}

const InviteWorkspaceModal = ({ show, onCloseModal, workspace }: InviteWorkspaceModalProps) => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const { mutate } = useWorkspaceMembers(workspace);

  const onCloseModalInner = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onCloseModal?.();
        setEmail('');
      }
    },
    [onCloseModal],
  );

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!email?.trim()) {
        toastError('이메일을 입력해 주세요');
        return;
      }
      try {
        await inviteWorkspaceAsync(workspace, email);
        mutate();
        onCloseModal?.();
        setEmail('');
      } catch (err) {
        notifyError(err, '사용자를 초대하지 못했습니다');
      }
    },
    [email, mutate, onCloseModal],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModalInner}>
      <form onSubmit={onSubmit}>
        <Label>
          <span>이메일</span>
          <Input id="email" value={email} onChange={onChangeEmail} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
