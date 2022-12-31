import { createChannelAsync } from '@apis/channel';
import Modal from '@components/base/Modal';
import { Button, Input, Label } from '@components/common/styles';
import useChannels from '@hooks/dataFetch/useChannels';
import useInput from '@hooks/useInput';
import { notifyError } from '@utils/toast';
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
    [onCloseModal],
  );

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        await createChannelAsync(workspaceUrl, channel);
        mutate();
        onCloseModal?.();
        setChannel('');
      } catch (err) {
        notifyError(err, '채널을 생성하지 못했습니다');
      }
    },
    [workspaceUrl, channel, mutate, onCloseModal],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModalInner}>
      <form onSubmit={onSubmit}>
        <Label id="channel-label">
          <span>채널</span>
          <Input id="text" value={channel} onChange={onChangeChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
