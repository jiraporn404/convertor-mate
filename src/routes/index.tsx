import { Box, Paper, Grid } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import ColorPalette from "../components/colorPalette";
import ColorConvertor from "../components/colorConvertor";
import FontConvertor from "../components/fontConvertor";
import ColorShade from "../components/colorShade";

function RouteComponent() {
  return (
    <Box>
      {/* <Typography variant="h4" gutterBottom>
        CSS Converter
      </Typography> */}

      <Grid container spacing={3}>
        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <FontConvertor />
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <ColorConvertor />
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <ColorPalette />
          </Paper>
        </Grid>
        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <ColorShade />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
