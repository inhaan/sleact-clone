import { DragOver } from './styles';

interface UploadCoverProps {
  show?: boolean;
}

const UploadCover = ({ show }: UploadCoverProps) => {
  if (!show) {
    return null;
  }
  return <DragOver>업로드</DragOver>;
};

export default UploadCover;
