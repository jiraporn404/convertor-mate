import { Snackbar, Alert } from "@mui/material";
import type { AlertProps } from "@mui/material";

interface CustomSnackbarProps {
  autoHideDuration?: number;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  severity?: AlertProps["severity"];
  openSnackbar: boolean;
  handleCloseSnackbar: () => void;
  message: string;
}

export const CustomSnackbar = ({
  autoHideDuration = 2000,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  severity = "success",
  openSnackbar,
  handleCloseSnackbar,
  message,
}: CustomSnackbarProps) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={autoHideDuration}
      onClose={handleCloseSnackbar}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
