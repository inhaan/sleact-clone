import { CSSProperties, ReactNode, MouseEvent } from 'react';
import { CreateModal, CloseModalButton } from './styles';

interface ModalProps {
  children?: ReactNode;
  style?: CSSProperties;
  show?: boolean;
  onCloseModal?(e: MouseEvent): void;
  closeButton?: boolean;
}

const Modal = ({ children, show, onCloseModal }: ModalProps) => {
  if (!show) {
    return null;
  }
  return (
    <CreateModal onClick={onCloseModal}>
      <div>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
