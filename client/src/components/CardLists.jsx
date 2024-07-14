import {  useEffect, useState } from "react";
import * as React from 'react';
import Message from './Message';
import { Grid, Typography, Box, Card,CardActions,CardContent,Button } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import {AddCardListModal} from "./AddCardListModal"
import { styled } from '@mui/system';

export default function CardLists() {

    const [cardLists,setCardLists]=useState([]);
    const {user} = useAuthContext();
    const userSourceLanguage = user.nativeLanguage;
    const userTargetLanguage = user.foreignLanguage;
    const navigate=useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const AddCardList = styled(Card)(({ theme }) => ({
        border: '2px dotted grey',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        minWidth: 275,
        minHeight: 150,
        height: 188,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));



    const fetchCardLists=async ()=>{
        try{
            console.log(user)
        const response = await fetch('http://localhost:5050/api/cardLists', {
        method:'GET',
        headers:
        {
            'authorization':user.token
        }
    })  
    const jsonResponse = await response.json();
    setCardLists(jsonResponse); 
    }
    catch (error) {
        console.error('Error fetching card lists:', error);
    }
    }

    const handleShowCards = (id) => {
        navigate(`/CardList/${id}`);
    };

    const handleAddCardList= async(newCardList)=>{
        console.log("New card list added");
        try{
            const response = await fetch(`http://localhost:5050/api/cardLists`, {
                method:'POST',
                headers:
                {   
                    'Content-Type': 'application/json',
                    'authorization':user.token
                },
                body:JSON.stringify(newCardList) 
            })  
            ;
            //fetch cards again
            fetchCardLists();
            
        }
        catch(error)
        {
            console.log('Error writing element to database',error)
        }
    }

    const handleExpandCardList= async(id)=>{
        console.log("Expanding Card List");
        try{
            const response = await fetch(`http://localhost:5050/api/cardLists/${id}/expandCardList`, {
                method:'POST',
                headers:
                {   
                    'Content-Type': 'application/json',
                    'authorization':user.token
                },
                
            })  
            ;
            if (response.status === 200) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setMessage('Card list was expanded successfully');
            setIsSuccess(true);
            } 
            fetchCardLists();
        }
        catch(error)
        {
            setMessage(error.response ? error.response.data : 'An error occurred');
            setIsSuccess(false);
        }
    }

    const handleCloseMessage = () => {
        setMessage('');
    };

    useEffect(()=>{
        fetchCardLists();
    },[]);

    return(
        <div>
       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
       <Grid item xs={4}>
                    <AddCardList onClick={handleOpen}>
                        <CardContent>
                            <Typography variant="h6" component="div" color="textSecondary">
                                + Add New Card List
                            </Typography>
                        </CardContent>
                    </AddCardList>
                </Grid>
                <AddCardListModal open={open} handleClose={handleClose} handleAddCardList={handleAddCardList} />
     
    {
    cardLists.length>0 && cardLists.map((cardList)=>(
        
        <Grid item xs={4} key={cardList._id}> 
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined" sx={{height: 188}}>
            <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Topic: {cardList.topic}
            </Typography>
            <Typography  variant="body2">
             Source Language: {userSourceLanguage}
            </Typography>
            <Typography  variant="body2">
              Target Language: {userTargetLanguage}
            </Typography>
            <Typography variant="body2">
              Number of cards: {cardList.cards.length}
              
            </Typography>
          </CardContent>
          <CardActions>
          <Button sx={{color:'primary.dark', borderColor: 'primary.dark'}} size="small" variant="outlined"
                  onClick={() => handleShowCards(cardList._id)}>
                  Show Cards
            </Button>
            <Button sx={{color:'primary.dark', borderColor: 'primary.dark'}} size="small" variant="outlined" 
                    onClick={()=>handleExpandCardList(cardList._id)}>
                  Expand using AI  ✨
            </Button>
          </CardActions>
            </Card>
            
        </Box>  
      </Grid>
    ))}

{message && (
                <Message message={message} isSuccess={isSuccess} onClose={handleCloseMessage} />
            )}
</Grid>
        </div>
    );
}