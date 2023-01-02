import { createChannelAsync } from '@apis/channel';
import Modal from '@components/base/Modal';
import { Button, Input, Label } from '@components/common/styles';
import useChannels from '@hooks/dataFetch/useChannels';
import useInput from '@hooks/useInput';
import { notifyError, toastError } from '@utils/toast';
import { FormEvent, MouseEvent, useCallback } from 'react';

interface CreateChannelModalProps {
  workspaceUrl: string;
  show?: boolean;
  onCloseModal?(): void;
}

const CreateChannelModal = ({ workspaceUrl, show, onCloseModal }: CreateChannelModalProps) => {
  const [channel, onChangeChannel, setChannel] = useInput('');
  const { mutate } = useChannels(workspaceUrl);

  const onCloseModalInner = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onCloseModal?.();
        setChannel('');
      }
    },
    [onCloseModal, setChannel],
  );

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!channel?.trim()) {
        toastError('채널명을 입력해 주세요');
        return;
      }
      try {
        await createChannelAsync(workspaceUrl, channel);
        mutate();
        onCloseModal?.();
        setChannel('');
      } catch (err) {
        notifyError(err, '채널을 생성하지 못했습니다');
      }
    },
    [workspaceUrl, channel, mutate, onCloseModal, setChannel],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModalInner}>
      <form onSubmit={onSubmit}>
        <Label>
          <span>채널</span>
          <Input id="text" value={channel} onChange={onChangeChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
