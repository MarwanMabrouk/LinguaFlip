import React, { useEffect, useState } from "react";
import FlipCard from "./card";
import { Grid, Typography, CardContent, Card, Button, TextField, Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { styled } from '@mui/system';
import { AddCardModal } from "./AddCardModal";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';



export default function PlayCards() {

    const [cards,setCards]=useState([])
    const {id}=useParams();
    const {user}=useAuthContext();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30); // initial time in seconds
    const [score, setScore] = useState(0);
    const [inputText, setInputText] = useState('');
    const [showScore, setShowScore] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [timerRunning, setTimerRunning] = useState(true); 

    useEffect(()=>{
        fetchCards()
    },[]);

    useEffect(() => {
    if (timeLeft > 0 && !showScore && timerRunning) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
     } else if (!showScore) {
        // Disable input field when time runs out
        setInputText('');
    }
}   , [timeLeft, timerRunning, showScore]);

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



const nextCard = () => {
    if (currentCardIndex + 1 < cards.length) {
        setCurrentCardIndex((prevIndex) => prevIndex + 1);
        setTimeLeft(10);
        setInputText('');
        setFeedbackMessage('');
        setShowFeedback(false);
        setTimerRunning(true);
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
            setTimerRunning(false);
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
                containerSx={{
                        height: '350px', // Ensure the height is set so that the centering works correctly
                        width: '600px', // Set the width of the card
                        minWidth: 300,
                        minHeight: 200,
                    }}
                typoSx={{
                        fontSize:'30px'
                }}
                   
            />
            <TextField
            label="Enter translation"
            value={inputText}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            sx={{
                maxWidth: '500px', // Same as the card width
                marginBottom: '0px', // Space between text field and the next element
                padding: '0 10px',// Optional: Add some padding for better aesthetics
                marginTop: '15px' 

            }}
            disabled={timeLeft <= 0} // Disable text field when time runs out
        />
        <div style={{ marginTop: '10px' }}>
            <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{backgroundColor: 'primary.main', color: '#000'}}
                style={{ marginRight: '10px' }}
                disabled={timeLeft <= 0} // Disable button when time runs out
            >
                Submit
            </Button>
            <Button
                onClick={handleNextCard}
                variant="contained"
                sx={{backgroundColor: 'primary.main', color: '#000'}}
            >
                Next Card
            </Button>
        </div>
        {showFeedback && (
            <Typography variant="h6" component="div" color={feedbackMessage === 'Correct!' ? 'green' : 'red'} style={{ marginTop: '10px' }}>
                {feedbackMessage}
            </Typography>
        )}
                
            <div style={{ position: 'absolute', top: '20px', right: '-250px' }}>
                <Box position="relative" display="inline-flex">
                    <CircularProgress
                        variant="determinate"
                        value={(timeLeft / 30) * 100}
                        size={150}
                        style={{ color: timeLeft <= 0 ? '#e1f5fe' : '#b3e5fc' }}

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
                <Typography variant="h6" component="div">
                    Score: {score}/{cards.length}
                </Typography>
            </div>
        </div>
    </div>
) : (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        

        <div style={{ position: 'relative', width: '800px', height: '50px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h4" component="div" sx={{ marginTop: 2 }}>
                Your Score: {score}/{cards.length}
            </Typography>
        </div>
        <div style={{position:'relative', width: '800px', marginTop:'20px'}}> 
            
            <div style={{left:0}}>
                <Link to="/play">
                    <KeyboardBackspaceOutlinedIcon fontSize="large"/>
                    Back
                </Link>
            </div>
            
        </div>
    </div>
    
)}
</div>
)
}
    