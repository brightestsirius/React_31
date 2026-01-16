import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

const MuiExample = () => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        bgcolor: "grey.50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: "8px",
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" color="primary.main" mb={2}>
          Material-UI (MUI)
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={() => alert("MUI Default Button!")}
          >
            Default MUI Button
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => alert("MUI Secondary Button!")}
          >
            Secondary MUI Button
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default MuiExample;
