import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { CustomSnackbar } from "./shared/CustomSnackbar";
import { useSnackbar } from "../hooks/useSnackbar";

interface ColorInfo {
  color: string;
  locked: boolean;
}

const hslToRgb = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));
  return `rgb(${r}, ${g}, ${b})`;
};

const rgbToHex = (rgb: string): string => {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return "";

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const generateColor = (baseHue?: number): string => {
  const hue = baseHue ?? Math.random() * 360;
  const saturation = 70 + Math.random() * 20; // 70-90%
  const lightness = 45 + Math.random() * 20; // 45-65%
  return hslToRgb(hue, saturation, lightness);
};

const generatePalette = (lockedColors: ColorInfo[]): ColorInfo[] => {
  return lockedColors.map((colorInfo) => {
    if (colorInfo.locked) return colorInfo;
    return { color: generateColor(), locked: false };
  });
};

interface ColorPaletteProps {
  onPaletteChange?: (colors: string[]) => void;
}

export default function ColorPalette({ onPaletteChange }: ColorPaletteProps) {
  const [colors, setColors] = useState<ColorInfo[]>([]);
  const { openSnackbar, handleOpenSnackbar, handleCloseSnackbar, message } =
    useSnackbar();

  const generateNewPalette = useCallback(() => {
    const newPalette = generatePalette(colors);
    setColors(newPalette);
    onPaletteChange?.(newPalette.map((c) => c.color));
  }, [colors, onPaletteChange]);

  useEffect(() => {
    // Initialize with 5 random colors
    const initialColors = Array(5)
      .fill(null)
      .map(() => ({
        color: generateColor(),
        locked: false,
      }));
    setColors(initialColors);
    onPaletteChange?.(initialColors.map((c) => c.color));
  }, [onPaletteChange]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        generateNewPalette();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [generateNewPalette]);

  const toggleLock = (index: number) => {
    const newColors = [...colors];
    newColors[index] = {
      ...newColors[index],
      locked: !newColors[index].locked,
    };
    setColors(newColors);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Color Palette Generator
      </Typography>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} justifyContent="center">
          {colors.map((colorInfo, index) => {
            const hexColor = rgbToHex(colorInfo.color);
            return (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.2s ease-in-out",
                  },
                }}
                onClick={() => {
                  navigator.clipboard.writeText(hexColor);
                  handleOpenSnackbar(`Copied ${hexColor} to clipboard!`);
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 1,
                    backgroundColor: colorInfo.color,
                    mb: 1,
                    position: "relative",
                  }}
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLock(index);
                    }}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    {colorInfo.locked ? (
                      <LockIcon fontSize="small" />
                    ) : (
                      <LockOpenIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
                <Typography variant="subtitle1" fontFamily="monospace">
                  {hexColor}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {colorInfo.color}
                </Typography>
              </Paper>
            );
          })}
        </Stack>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={generateNewPalette}
            sx={{ mr: 2 }}
          >
            Generate New Palette
          </Button>
          <Typography variant="caption" color="text.secondary">
            Press spacebar to generate new palette
          </Typography>
        </Box>
      </Stack>
      <CustomSnackbar
        message={message}
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </div>
  );
}
