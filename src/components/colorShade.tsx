import {
  Typography,
  TextField,
  Box,
  Paper,
  Grid,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { hexToRgb, rgbToHex } from "../utils/colorUtils";
import { useSnackbar } from "../hooks/useSnackbar";
import { CustomSnackbar } from "./shared/CustomSnackbar";

export default function ColorShade() {
  const [baseColor, setBaseColor] = useState("#2196f3");
  const { openSnackbar, handleOpenSnackbar, handleCloseSnackbar, message } =
    useSnackbar();

  const generateShades = (hexColor: string) => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return [];

    const shades = [];
    for (let i = 1; i <= 5; i++) {
      const factor = 1 - i * 0.15;
      const darkerRgb = {
        r: Math.round(rgb.r * factor),
        g: Math.round(rgb.g * factor),
        b: Math.round(rgb.b * factor),
      };
      shades.unshift(rgbToHex(darkerRgb));
    }

    shades.push(hexColor);

    for (let i = 1; i <= 4; i++) {
      const factor = 1 + i * 0.15;
      const lighterRgb = {
        r: Math.min(255, Math.round(rgb.r * factor)),
        g: Math.min(255, Math.round(rgb.g * factor)),
        b: Math.min(255, Math.round(rgb.b * factor)),
      };
      shades.push(rgbToHex(lighterRgb));
    }

    return shades;
  };

  const shades = generateShades(baseColor);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Color Shade Converter
      </Typography>

      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: baseColor,
            border: "1px solid #ccc",
            borderRadius: 1,
          }}
        />
        <TextField
          label="Hex Color"
          value={baseColor.replace("#", "")}
          onChange={(e) => {
            const value = e.target.value;
            setBaseColor(value.startsWith("#") ? value : `#${value}`);
          }}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">#</InputAdornment>,
          }}
        />
        {/* <TextField
          type="color"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          sx={{ width: 100 }}
        /> */}
        {/* <Typography variant="body2" sx={{ mt: 1 }}>
          Base Color: {baseColor}
        </Typography> */}
      </Box>

      <Grid container spacing={2}>
        {shades.map((shade, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={index}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: shade,
                color: getContrastColor(shade),
                cursor: "pointer",
              }}
              onClick={() => {
                navigator.clipboard.writeText(shade);
                handleOpenSnackbar(`Copied ${shade} to clipboard!`);
              }}
            >
              <Typography variant="body2">{shade}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <CustomSnackbar
        message={message}
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </div>
  );
}

function getContrastColor(hexColor: string) {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return "#000000";

  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#ffffff";
}
