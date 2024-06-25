import {  useEffect, useState } from "react";
import * as React from 'react';
import { Grid, Typography, Box, Card,CardContent} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";


export default function PlaySelectTopic(){

    const [cardLists,setCardLists]=useState([]);
    const {user} = useAuthContext();
    const navigate=useNavigate();
    const [isSelected, setIsSelected] = useState(false);
    const [listSelected, setListSelected] = useState(null);

    const handleListSelected = (id) => {
        setIsSelected(true);
        // id is the id of the list card that has been selected
        setListSelected(id);

    };

    const fetchCardLists=async ()=>{
        try{
            console.log(user)
            const response = await fetch('http://localhost:5050/api/cardLists', 
            {
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

    useEffect(()=>{
        fetchCardLists();
    },[]);

    return(
        <div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                
                {cardLists.length>0 && cardLists.map((cardList)=>(
                    
                    <Grid item xs={4} key={cardList._id} onClick={() =>handleListSelected(cardList._id)}> 
                        <Box sx={{ minWidth: 275 }}>
                            <Card variant="outlined" sx={{height: 188}} >
                                <CardContent>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        Topic: {cardList.topic}
                                    </Typography>
                                    <Typography  variant="body2">
                                        Source Language: {cardList.sourceLanguage}
                                    </Typography>
                                    <Typography  variant="body2">
                                        Target Language: {cardList.targetLanguage}
                                    </Typography>
                                    <Typography variant="body2">
                                        Number of cards: {cardList.cards.length}
                                    </Typography>
                                </CardContent>
                            </Card> 
                        </Box>  
                    </Grid>
                ))}
            </Grid>
        </div>
    );

}