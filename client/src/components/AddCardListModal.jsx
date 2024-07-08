import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';
import { useAuthContext } from "../hooks/useAuthContext";


export const AddCardListModal = ({ open, handleClose, handleAddCardList }) => {
    const [topic, setTopic] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const {user} = useAuthContext();
    const userSourceLanguage = user.nativeLanguage;
    const userTargetLanguage = user.foreignLanguage;
    

    const handleSubmit = () => {
        setSourceLanguage(userSourceLanguage);
    setTargetLanguage(userTargetLanguage);
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
                
                <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
                    Add Card List
                </Button>
            </Box>
        </Modal>
    );
};
