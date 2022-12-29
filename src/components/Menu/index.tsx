import { CSSProperties, MouseEvent, ReactNode } from 'react';
import { CloseModalButton, CreateMenu } from './styles';

interface MenuProps {
  children?: ReactNode;
  style?: CSSProperties;
  show?: boolean;
  onCloseModal?(e: MouseEvent): void;
  closeButton?: boolean;
}

const Menu = ({ children, style, show, onCloseModal, closeButton = true }: MenuProps) => {
  if (!show) {
    return null;
  }
  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
