import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function FontConvertor() {
  const [pxValue, setPxValue] = useState<string>("");
  const [remValue, setRemValue] = useState<string>("");
  const [baseFontSize, setBaseFontSize] = useState<number>(16);

  const handlePxChange = (value: string) => {
    setPxValue(value);
    if (value === "") {
      setRemValue("");
      return;
    }
    const px = parseFloat(value);
    if (!isNaN(px)) {
      setRemValue((px / baseFontSize).toFixed(4));
    }
  };

  const handleRemChange = (value: string) => {
    setRemValue(value);
    if (value === "") {
      setPxValue("");
      return;
    }
    const rem = parseFloat(value);
    if (!isNaN(rem)) {
      setPxValue((rem * baseFontSize).toFixed(2));
    }
  };
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Pixel to Rem Converter
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Base Font Size (px)"
          type="number"
          value={baseFontSize}
          onChange={(e) => setBaseFontSize(Number(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          }}
        />
        <TextField
          label="Pixels"
          type="number"
          value={pxValue}
          onChange={(e) => handlePxChange(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          }}
        />
        <TextField
          label="Rem"
          type="number"
          value={remValue}
          onChange={(e) => handleRemChange(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">rem</InputAdornment>,
          }}
        />
      </Stack>
    </div>
  );
}
