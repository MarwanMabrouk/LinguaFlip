import { useEffect, useState } from "react";
import FlipCard from "./card";
import { Grid, Typography, CardContent, Card, Button } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { styled } from "@mui/system";
import { AddCardModal } from "./AddCardModal";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const { id } = useParams();
  const { user } = useAuthContext();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const AddCard = styled(Card)({
    border: "2px dotted grey",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "300px",
    minWidth: 300,
    minHeight: 200,
    textAlign: "center",
    borderRadius: "50px",
  });

  const fetchCards = async () => {
    try {
      console.log(id);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cardLists/${id}`,
        {
          method: "GET",
          headers: {
            authorization: user.token,
          },
        },
      );
      const jsonResponse = await response.json();
      setCards(jsonResponse);
    } catch (error) {
      console.log("Error fetching card list details", error);
    }
  };
  const handleAddCard = async (newCard) => {
    console.log("New card added", newCard);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cardLists/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: user.token,
          },
          body: JSON.stringify(newCard),
        },
      );

      const jsonResponse = await response.json();
      if (cards.length > 0) {
        setCards([jsonResponse, ...cards]);
      } else {
        setCards([jsonResponse]);
      }
    } catch (error) {
      console.log("Error writing element to database", error);
    }
  };

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleShuffle = () => {
    setCards(shuffleArray(cards));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div>
      <Button
        onClick={handleShuffle}
        variant="contained"
        startIcon={<ShuffleIcon />}
        sx={{ width: "100%", mb: 2, backgroundColor: "#0277bd", color: "#fff" }}
      >
        Shuffle Cards
      </Button>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justify={"center"}
      >
        <Grid item xs={4}>
          <AddCard onClick={handleOpen}>
            <CardContent>
              <Typography variant="h6" component="div" color="textSecondary">
                + Add New Card
              </Typography>
            </CardContent>
          </AddCard>
        </Grid>
        <AddCardModal
          open={open}
          handleClose={handleClose}
          handleAddCard={handleAddCard}
        />

        {cards.length > 0 &&
          cards.map((card) => (
            <Grid item xs={4} key={card.title}>
              <FlipCard
                title={card.title}
                sourceLanguage={card.sourceLanguage}
                targetLanguage={card.targetLanguage}
                containerSx={{
                  height: "200px",
                  width: "300px",
                  minWidth: 300,
                  minHeight: 200,
                }}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
