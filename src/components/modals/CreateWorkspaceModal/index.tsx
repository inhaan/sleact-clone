import { createWorkspaceAsync } from '@apis/workspaces';
import { Button, Input, Label } from '@components/common/styles';
import Modal from '@components/base/Modal';
import useUsers from '@hooks/dataFetch/useUsers';
import useInput from '@hooks/useInput';
import { notifyError, toastError } from '@utils/toast';
import { FormEvent, MouseEvent, useCallback } from 'react';

interface CreateWorkspaceModalProps {
  show?: boolean;
  onCloseModal?(): void;
}

const CreateWorkspaceModal = ({ show, onCloseModal }: CreateWorkspaceModalProps) => {
  const { mutate } = useUsers();
  const [workspace, onChangeWorkspace, setWorkspace] = useInput('');
  const [url, onChangeUrl, setUrl] = useInput('');

  const closeModal = useCallback(() => {
    onCloseModal?.();
    setWorkspace('');
    setUrl('');
  }, [onCloseModal]);

  const onCloseModalInner = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal],
  );

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!workspace?.trim() || !url?.trim()) {
        toastError('워크스페이스 이름과 url을 입력해 주세요');
        return;
      }
      try {
        await createWorkspaceAsync(workspace, url);
        mutate();
        closeModal();
      } catch (err) {
        notifyError(err, '채널을 생성하지 못했습니다');
      }
    },
    [workspace, url, mutate, closeModal],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModalInner}>
      <form onSubmit={onSubmit}>
        <Label>
          <span>워크스페이스 이름</span>
          <Input value={workspace} onChange={onChangeWorkspace} />
        </Label>
        <Label>
          <span>워크스페이스 url</span>
          <Input value={url} onChange={onChangeUrl} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateWorkspaceModal;
