import { inviteChannelMemberAsync } from '@apis/workspaces';
import Modal from '@components/base/Modal';
import { Button, Input, Label } from '@components/common/styles';
import useWorkspaceChannelMembers from '@hooks/dataFetch/useWorkspaceChannelMembers';
import useInput from '@hooks/useInput';
import { notifyError, toastError } from '@utils/toast';
import { FormEvent, MouseEvent, useCallback } from 'react';

interface InviteChannelModalProps {
  show?: boolean;
  onCloseModal?(): void;
  workspace: string;
  channel: string;
}

const InviteChannelModal = ({ show, onCloseModal, workspace, channel }: InviteChannelModalProps) => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const { mutate } = useWorkspaceChannelMembers(workspace, channel);

  const onCloseModalInner = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onCloseModal?.();
        setEmail('');
      }
    },
    [onCloseModal, setEmail],
  );

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!email?.trim()) {
        toastError('이메일을 입력해 주세요');
        return;
      }
      try {
        await inviteChannelMemberAsync(workspace, channel, email);
        mutate();
        onCloseModal?.();
        setEmail('');
      } catch (err) {
        notifyError(err, '사용자를 초대하지 못했습니다');
      }
    },
    [workspace, channel, email, mutate, onCloseModal, setEmail],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModalInner}>
      <form onSubmit={onSubmit}>
        <Label>
          <span>채널 멤버 초대</span>
          <Input type="email" value={email} onChange={onChangeEmail} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;
