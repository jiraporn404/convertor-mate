import { Paper, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return (
    <Paper sx={{ p: 2 }}>
      {" "}
      <Typography variant="h6" gutterBottom>
        Generate Fake Data
      </Typography>
    </Paper>
  );
}

export const Route = createFileRoute("/fake-data")({
  component: RouteComponent,
});
