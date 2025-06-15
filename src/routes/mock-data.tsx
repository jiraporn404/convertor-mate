import { fakerEN, fakerTH } from "@faker-js/faker";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CustomSnackbar } from "../components/shared/CustomSnackbar";
import { useSnackbar } from "../hooks/useSnackbar";

interface FieldConfig {
  name: string;
  type: string;
}

function RouteComponent() {
  const [count, setCount] = useState("10");
  const [generatedData, setGeneratedData] = useState<any[]>([]);
  const [format, setFormat] = useState("json");
  const [fields, setFields] = useState<FieldConfig[]>([
    { name: "name", type: "fullName" },
  ]);
  const [locale, setLocale] = useState("en");
  const { handleCloseSnackbar, openSnackbar, handleOpenSnackbar, message } =
    useSnackbar();

  const locales = [
    { value: "en", label: "English", faker: fakerEN },
    // { value: "es", label: "Spanish", faker: fakerES },
    // { value: "fr", label: "French", faker: fakerFR },
    // { value: "de", label: "German", faker: fakerDE },
    // { value: "ja", label: "Japanese", faker: fakerJA },
    // { value: "zh", label: "Chinese", faker: fakerZH_CN },
    // { value: "ko", label: "Korean", faker: fakerKO },
    // { value: "ru", label: "Russian", faker: fakerRU },
    // { value: "ar", label: "Arabic", faker: fakerAR },
    // { value: "pt", label: "Portuguese", faker: fakerPT_BR },
    // { value: "it", label: "Italian", faker: fakerIT },
    // { value: "nl", label: "Dutch", faker: fakerNL },
    // { value: "pl", label: "Polish", faker: fakerPL },
    { value: "th", label: "Thai", faker: fakerTH },
    // { value: "tr", label: "Turkish", faker: fakerTR },
    // { value: "vi", label: "Vietnamese", faker: fakerVI },
  ];

  const fieldTypes = [
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
    { value: "fullName", label: "Full Name" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone Number" },
    { value: "date", label: "Date" },
    { value: "number", label: "Number" },
    { value: "word", label: "Word" },
    { value: "sentence", label: "Sentence" },
    { value: "paragraph", label: "Paragraph" },
  ];

  const getCurrentFaker = () => {
    return locales.find((loc) => loc.value === locale)?.faker || fakerEN;
  };

  const addField = () => {
    setFields([...fields, { name: "", type: "" }]);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const updateField = (index: number, field: Partial<FieldConfig>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...field };
    setFields(newFields);
  };

  const generateValue = (type: string) => {
    const currentFaker = getCurrentFaker();
    switch (type) {
      case "firstName":
        return currentFaker.person.firstName();
      case "lastName":
        return currentFaker.person.lastName();
      case "fullName":
        return currentFaker.person.fullName();
      case "email":
        return currentFaker.internet.email();
      case "phone":
        return currentFaker.phone.number();
      case "date":
        return currentFaker.date.anytime().toISOString();
      case "number":
        return currentFaker.number.int({ min: 1, max: 1000 });
      case "word":
        return currentFaker.word.sample();
      case "sentence":
        return currentFaker.lorem.sentence();
      case "paragraph":
        return currentFaker.lorem.paragraph();
      default:
        return "";
    }
  };

  const generateData = () => {
    const numItems = Math.min(Math.max(parseInt(count) || 1, 1), 1000);
    const data = [];

    for (let i = 0; i < numItems; i++) {
      const item: any = { id: i + 1 };
      fields.forEach((field) => {
        if (field.name && field.type) {
          item[field.name] = generateValue(field.type);
        }
      });
      data.push(item);
    }

    setGeneratedData(data);
  };

  const handleCopy = async () => {
    try {
      const dataToCopy =
        format === "json"
          ? JSON.stringify(generatedData, null, 2)
          : generatedData
              .map((item) => Object.values(item).join(","))
              .join("\n");
      await navigator.clipboard.writeText(dataToCopy);
      handleOpenSnackbar("Data copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy data: ", err);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Generate Fake Data
      </Typography>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <TextField
              label="Number of Items"
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              inputProps={{ min: 1, max: 1000 }}
              fullWidth
              helperText="Enter a number between 1 and 1000"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                value={locale}
                label="Language"
                onChange={(e) => setLocale(e.target.value)}
              >
                {locales.map((loc) => (
                  <MenuItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom>
          Field Configuration
        </Typography>
        <Stack>
          {fields.map((field, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid size={{ xs: 12, sm: 5 }}>
                <TextField
                  label="Field Name"
                  value={field.name}
                  onChange={(e) => updateField(index, { name: e.target.value })}
                  fullWidth
                  placeholder="e.g., firstName"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 5 }}>
                <FormControl fullWidth>
                  <InputLabel>Field Type</InputLabel>
                  <Select
                    value={field.type}
                    label="Field Type"
                    onChange={(e) =>
                      updateField(index, { type: e.target.value })
                    }
                  >
                    {fieldTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <IconButton
                  color="error"
                  onClick={() => removeField(index)}
                  disabled={fields.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addField}
            variant="outlined"
            sx={{ alignSelf: "flex-start" }}
          >
            Add Field
          </Button>
        </Stack>

        <Stack direction="row">
          <FormControlLabel
            control={
              <Switch
                checked={format === "json"}
                onChange={(e) => setFormat(e.target.checked ? "json" : "csv")}
              />
            }
            label="JSON Format"
          />{" "}
          <Button variant="contained" color="primary" onClick={generateData}>
            Generate Data
          </Button>
        </Stack>

        {generatedData.length > 0 && (
          <>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                p: 2,
                borderRadius: 1,
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
              <pre style={{ margin: 0 }}>
                {format === "json"
                  ? JSON.stringify(generatedData, null, 2)
                  : generatedData
                      .map((item) => Object.values(item).join(","))
                      .join("\n")}
              </pre>
            </Box>
            <Button variant="outlined" onClick={handleCopy}>
              Copy to Clipboard
            </Button>
          </>
        )}
      </Stack>

      <CustomSnackbar
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        message={message}
      />
    </Paper>
  );
}

export const Route = createFileRoute("/mock-data")({
  component: RouteComponent,
});
