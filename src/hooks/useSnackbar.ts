import { useState } from "react";

interface UseSnackbarProps {
  autoHideDuration?: number;
}

interface UseSnackbarReturn {
  openSnackbar: boolean;
  message: string;
  handleOpenSnackbar: (message: string) => void;
  handleCloseSnackbar: () => void;
}

export const useSnackbar = ({}: UseSnackbarProps = {}): UseSnackbarReturn => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleOpenSnackbar = (message: string) => {
    setMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return {
    openSnackbar,
    message,
    handleOpenSnackbar,
    handleCloseSnackbar,
  };
};
