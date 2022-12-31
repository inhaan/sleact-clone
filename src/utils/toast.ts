import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

export const toastError = (message: string) => {
  toast.error(message, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light',
  });
};

export const notifyError = (e: unknown, message = '') => {
  if (isAxiosError(e) && e.response?.data) {
    message = e.response?.data;
  }
  toastError(message);
  console.error(e);
};
