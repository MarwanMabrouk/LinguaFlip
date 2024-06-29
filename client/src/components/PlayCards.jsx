import React, { useEffect, useState } from "react";
import FlipCard from "./card";
import { Grid, Typography, CardContent, Card, Button, TextField, Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { styled } from '@mui/system';
import { AddCardModal } from "./AddCardModal";



export default function PlayCards() {

    const [cards,setCards]=useState([])
    const {id}=useParams();
    const {user}=useAuthContext();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const AddCard = styled(Card)({
        border: '2px dotted grey',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', // Ensure the height is set so that the centering works correctly
        width: '300px', // Set the width of the card
        minWidth: 300,
        minHeight: 200,
        textAlign: 'center', // This will center the text horizontally
        borderRadius: '50px' // This will make the edges rounded
          
    });

    const fetchCards=async ()=>{
        try{
        console.log(id);
        const response = await fetch(`http://localhost:5050/api/cardLists/${id}`, {
        method:'GET',
        headers:
        {
            'authorization':user.token
        }
    })  
        const jsonResponse = await response.json();
        setCards(jsonResponse);
    }
    catch (error){
        console.log('Error fetching card list details',error);
    }
}

const [currentCardIndex, setCurrentCardIndex] = useState(0);
const [timeLeft, setTimeLeft] = useState(10); // initial time in seconds
const [score, setScore] = useState(0);
const [inputText, setInputText] = useState('');
const [showScore, setShowScore] = useState(false);
const [feedbackMessage, setFeedbackMessage] = useState('');
const [showFeedback, setShowFeedback] = useState(false);

useEffect(()=>{
    fetchCards()
},[]);

useEffect(() => {
    if (timeLeft > 0 && !showScore) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    } else if (!showScore) {
        // Disable input field when time runs out
        setInputText('');
    }
}, [timeLeft, showScore]);


const nextCard = () => {
    if (currentCardIndex + 1 < cards.length) {
        setCurrentCardIndex((prevIndex) => prevIndex + 1);
        setTimeLeft(10);
        setInputText('');
        setFeedbackMessage('');
        setShowFeedback(false);
    } else {
        setShowScore(true);
    }
};
/* const handleInputChange = (event) => {
    setInputText(event.target.value);
    if (event.target.value === cards[currentCardIndex].targetLanguage) {
        setScore(score + 1);
        nextCard();
    }
}; */

const handleInputChange = (event) => {
    setInputText(event.target.value);
};

const handleSubmit = () => {
    if (timeLeft > 0) {
        if (inputText === cards[currentCardIndex].targetLanguage) {
            setScore(score + 1);
            setFeedbackMessage('Correct!');
        } else {
            setFeedbackMessage('Incorrect! Try again.');
        }
        setShowFeedback(true);
    }
};

const handleNextCard = () => {
    nextCard();
};


return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
       {cards.length > 0 && !showScore ? (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '800px', height: '600px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <FlipCard
                key={cards[currentCardIndex]._id}
                title={cards[currentCardIndex].title}
                sourceLanguage={cards[currentCardIndex].sourceLanguage}
                targetLanguage={cards[currentCardIndex].targetLanguage}
                showBack={showFeedback} // Show the back side if feedback is shown
    style={{
        maxWidth: '900px', // Increase the maximum width of the card
        height: '500px',  // Increase the height of the card
        marginBottom: '20px',  // Ensure there’s enough space below the card
    }}
            />
            <TextField
            label="Enter translation"
            value={inputText}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            style={{
                maxWidth: '800px', // Same as the card width
                marginBottom: '0px', // Space between text field and the next element
                padding: '0 10px' // Optional: Add some padding for better aesthetics
            }}
            disabled={timeLeft <= 0} // Disable text field when time runs out
        />
        <div style={{ marginTop: '10px' }}>
            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }}
                disabled={timeLeft <= 0} // Disable button when time runs out
            >
                Submit
            </Button>
            <Button
                onClick={handleNextCard}
                variant="contained"
                color="secondary"
            >
                Next Card
            </Button>
        </div>
        {showFeedback && (
            <Typography variant="h6" component="div" color={feedbackMessage === 'Correct!' ? 'green' : 'red'} style={{ marginTop: '10px' }}>
                {feedbackMessage}
            </Typography>
        )}
                
            <div style={{ position: 'absolute', top: '20px', left: '-200px' }}>
                <Typography variant="h6" component="div">
                    Score: {score}/{cards.length}
                </Typography>
            </div>
            <div style={{ position: 'absolute', top: '20px', right: '-250px' }}>
                <Box position="relative" display="inline-flex">
                    <CircularProgress
                        variant="determinate"
                        value={(timeLeft / 10) * 100}
                        size={150}
                        style={{ color: timeLeft <= 0 ? '#d32f2f' : '#41669d' }}
                    />
                    <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="h4" component="div" color="textSecondary">
                            {timeLeft}s
                        </Typography>
                    </Box>
                </Box>
            </div>
        </div>
    </div>
) : (
    <div style={{ position: 'absolute', top: '40px', right: '-250px' }}>
    <Typography variant="h4" component="div" sx={{ marginTop: 2 }}>
        Your Score: {score}/{cards.length}
    </Typography>
    </div>
    
)}
</div>
)
}
    