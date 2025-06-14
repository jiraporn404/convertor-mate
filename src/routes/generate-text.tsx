import {
  TextField,
  Stack,
  Typography,
  Button,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
  Box,
  Paper,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

function RouteComponent() {
  const [paragraphs, setParagraphs] = useState("5");
  const [generatedText, setGeneratedText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [htmlFormat, setHtmlFormat] = useState(false);

  const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "dolor",
    "in",
    "reprehenderit",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "dolore",
    "eu",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "in",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
  ];

  const generateRandomSentence = (minWords = 5, maxWords = 15) => {
    const numWords =
      Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const words = [];
    for (let i = 0; i < numWords; i++) {
      const randomIndex = Math.floor(Math.random() * loremWords.length);
      words.push(loremWords[randomIndex]);
    }
    return words.join(" ") + ".";
  };

  const generateParagraph = (minSentences = 3, maxSentences = 7) => {
    const numSentences =
      Math.floor(Math.random() * (maxSentences - minSentences + 1)) +
      minSentences;
    const sentences = [];
    for (let i = 0; i < numSentences; i++) {
      sentences.push(generateRandomSentence());
    }
    return sentences.join(" ");
  };

  const generateLoremIpsum = (numParagraphs: number) => {
    const paragraphs = [];
    for (let i = 0; i < numParagraphs; i++) {
      let paragraph = generateParagraph();
      if (i === 0 && startWithLorem) {
        paragraph = "Lorem ipsum dolor sit amet, " + paragraph;
      }
      paragraphs.push(paragraph);
    }
    return htmlFormat
      ? paragraphs.map((p) => `<p>${p}</p>`).join("\n")
      : paragraphs.join("\n\n");
  };

  const handleGenerate = () => {
    const numParagraphs = Math.min(Math.max(parseInt(paragraphs) || 1, 1), 100);
    const text = generateLoremIpsum(numParagraphs);
    setGeneratedText(text);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setShowAlert(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Generate Lorem Ipsum
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Number of Paragraphs"
          type="number"
          value={paragraphs}
          onChange={(e) => setParagraphs(e.target.value)}
          inputProps={{ min: 1, max: 100 }}
          helperText="Enter a number between 1 and 100"
        />
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
              />
            }
            label="Start with 'Lorem ipsum dolor sit amet'"
          />
          <FormControlLabel
            control={
              <Switch
                checked={htmlFormat}
                onChange={(e) => setHtmlFormat(e.target.checked)}
              />
            }
            label="HTML Format"
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleGenerate}>
          Generate
        </Button>
        {generatedText && (
          <>
            <Typography
              variant="body1"
              style={{
                whiteSpace: "pre-wrap",
                backgroundColor: "#f5f5f5",
                padding: "20px",
                borderRadius: "4px",
              }}
            >
              {generatedText}
            </Typography>
            <Button variant="outlined" onClick={handleCopy}>
              Copy to Clipboard
            </Button>
          </>
        )}
      </Stack>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          Text copied to clipboard!
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export const Route = createFileRoute("/generate-text")({
  component: RouteComponent,
});
