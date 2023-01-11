import { toastError } from './toast';

export const getImageFormData = (dataTransfer: DataTransfer) => {
  const formData = new FormData();
  if (dataTransfer.items) {
    for (let i = 0; i < dataTransfer.items.length; i++) {
      if (dataTransfer.items[i].kind === 'file') {
        const file = dataTransfer.items[i].getAsFile();
        if (file) {
          if (!file.type.startsWith('image/')) {
            toastError('이미지 파일을 업로드해 주세요');
            return null;
          }
          formData.append('image', file);
        }
      }
    }
  } else {
    for (let i = 0; i < dataTransfer.files.length; i++) {
      const file = dataTransfer.files[i];
      if (!file.type.startsWith('image/')) {
        toastError('이미지 파일을 업로드해 주세요');
        return null;
      }
      formData.append('image', file);
    }
  }
  return formData;
};
