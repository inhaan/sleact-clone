import { createChannelAsync } from '@apis/channel';
import Modal from '@components/base/Modal';
import { Button, Input, Label } from '@components/common/styles';
import useInput from '@hooks/useInput';
import { MouseEvent, useCallback } from 'react';

interface CreateChannelModalProps {
  show?: boolean;
  onCloseModal?(): void;
}

const CreateChannelModal = ({ show, onCloseModal }: CreateChannelModalProps) => {
  const [channel, onChangeChannel, setChannel] = useInput('');

  const onCloseModalInner = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onCloseModal?.();
      }
    },
    [onCloseModal],
  );

  const onSubmit = useCallback(async () => {
    //
    // await createChannelAsync('', channel);
  }, []);

  return (
    <Modal show={show} onCloseModal={onCloseModalInner}>
      <form onSubmit={onSubmit}>
        <Label id="channel-label">
          <span>채널</span>
          <Input id="channel" value={channel} onChange={onChangeChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
