import React, { useState } from "react";
import { Box, Typography, Button, Modal, TextField } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

export const AddCardModal = ({ open, handleClose, handleAddCard }) => {
  const [title, setTitle] = useState("");
  const { user } = useAuthContext();
  const userTargetLanguage = user.foreignLanguage;

  const handleSubmit = () => {
    handleAddCard({
      title,
      sourceLanguage: title,
      targetLanguage: userTargetLanguage,
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add a New Card
        </Typography>
        <TextField
          label="Word or Phrase"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
          Add Card
        </Button>
      </Box>
    </Modal>
  );
};
