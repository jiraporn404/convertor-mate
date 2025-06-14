import { CssBaseline, ThemeProvider } from "@mui/material";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { SnackbarProvider } from "notistack";
import "./App.css";
import { routeTree } from "./routeTree.gen";
import { theme } from "./theme";

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
