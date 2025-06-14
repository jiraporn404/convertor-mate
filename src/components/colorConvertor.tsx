import {
  Stack,
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useSnackbar } from "../hooks/useSnackbar";
import { CustomSnackbar } from "./shared/CustomSnackbar";

export default function ColorConvertor() {
  const [hexColor, setHexColor] = useState<string>("#000000");
  const [rgbColor, setRgbColor] = useState<string>("rgb(0, 0, 0)");
  const [rgbaColor, setRgbaColor] = useState<string>("rgba(0, 0, 0, 1)");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const { openSnackbar, handleOpenSnackbar, handleCloseSnackbar, message } =
    useSnackbar();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const handleHexChange = (value: string) => {
    setHexColor(value);
    const rgb = hexToRgb(value);
    if (rgb) {
      setRgbColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      setRgbaColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`);
    }
  };

  const rgbToHex = (rgb: string) => {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return null;
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const handleRgbChange = (value: string) => {
    setRgbColor(value);
    const hex = rgbToHex(value);
    if (hex) {
      setHexColor(hex);
      setRgbaColor(value.replace("rgb", "rgba").replace(")", ", 1)"));
    }
  };

  const handleColorPickerChange = (color: string) => {
    handleHexChange(color);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Color Converter
      </Typography>
      <Box sx={{ width: 1, display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 100,
            height: 100,
            backgroundColor: hexColor,
            border: "1px solid #ccc",
            borderRadius: 1,
            cursor: "pointer",
          }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        />
        {showColorPicker && (
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
              }}
              onClick={() => setShowColorPicker(false)}
            />
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: "100%",
                mt: 1,
              }}
            >
              <HexColorPicker
                color={hexColor}
                onChange={handleColorPickerChange}
              />
            </Box>
          </Box>
        )}
        <Stack flex={1}>
          <Stack direction={"row"}>
            {/* <TextField
              label="Hex Color"
              value={hexColor}
              onChange={(e) => handleHexChange(e.target.value)}
              fullWidth
            /> */}
            <TextField
              label="Hex Color"
              value={hexColor.replace("#", "")}
              onChange={(e) => {
                const value = e.target.value;
                handleHexChange(value.startsWith("#") ? value : `#${value}`);
              }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
            />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(hexColor);
                handleOpenSnackbar(`Copied ${hexColor} to clipboard!`);
              }}
            >
              Copy
            </Button>
          </Stack>
          <Stack direction={"row"}>
            {" "}
            <TextField
              label="RGB Color"
              value={rgbColor}
              onChange={(e) => handleRgbChange(e.target.value)}
              fullWidth
            />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(rgbColor);
                handleOpenSnackbar(`Copied ${rgbColor} to clipboard!`);
              }}
            >
              Copy
            </Button>
          </Stack>
          <Stack direction={"row"}>
            <TextField
              label="RGBA Color"
              value={rgbaColor}
              onChange={(e) => setRgbaColor(e.target.value)}
              fullWidth
            />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(rgbaColor);
                handleOpenSnackbar(`Copied ${rgbaColor} to clipboard!`);
              }}
            >
              Copy
            </Button>
          </Stack>
        </Stack>
      </Box>
      <CustomSnackbar
        message={message}
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </div>
  );
}
