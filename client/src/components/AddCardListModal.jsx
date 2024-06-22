import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';


export const AddCardListModal = ({ open, handleClose, handleAddCardList }) => {
    const [topic, setTopic] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    

    const handleSubmit = () => {
        handleAddCardList({ topic, sourceLanguage, targetLanguage, cards:[] });
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2">
                    Add a New Card List
                </Typography>
                <TextField
                    label="Topic"
                    fullWidth
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Source Language"
                    fullWidth
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Target Language"
                    fullWidth
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
                    Add Card List
                </Button>
            </Box>
        </Modal>
    );
};