import { useEffect, useState } from "react";
import Card from "./card";
import cardList from "../cards"
import { Grid, Typography } from "@mui/material";


export default function CardList() {

    const [cards,setCards]=useState()
    
    const getCards= ()=>{
        setCards(cardList.cards);
    }

    useEffect(getCards,[]);


    return(
        <div>
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    {
    cards?.map((card)=>(
        
        <Grid item xs={4} key={card.title}> 
        <Card 
        title={card.title}
        sourceLanguage={card.sourceLanguage}
        targetLanguage={card.targetLanguage}
        />
            
      </Grid>
    ))}
</Grid>
        </div>
    );
}