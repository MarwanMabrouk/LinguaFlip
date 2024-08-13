import mongoose from "mongoose";
import { userSchema } from "../models/userModel.js";
import { cardListSchema } from "../models/cardListModel.js";
import { cardSchema } from "../models/cardModel.js";
import { translateText } from "./utils/translate.js";
import { getOpenAIResponse } from "./utils/gpt-expansion.js";

const User = mongoose.model("User", userSchema);
const CardList = mongoose.model("cardList", cardListSchema);
const Card = mongoose.model("card", cardSchema);

export const fetchUserCardLists = async (req, res) => {
  try {
    const user_id = req.user;

    const user = await User.findOne({ _id: user_id })
      .populate("cardLists")
      .exec();

    res.status(200).json(user.cardLists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchCards = async (req, res) => {
  try {
    console.log(req.params.id);
    const cardList_id = req.params.id;
    const result = await CardList.findOne({ _id: cardList_id })
      .populate("cards")
      .exec();
    console.log(result.cards);
    res.status(200).json(result.cards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const postCard = async (req, res) => {
  try {
    const targetLanguageText = await translateText(
      req.body.sourceLanguage,
      req.sourceLanguage,
      req.body.targetLanguage,
    );
    console.log(targetLanguageText);
    const cardList_id = req.params.id;

    const card = new Card({ ...req.body, targetLanguage: targetLanguageText });
    await card.save();
    const cardList = await CardList.findOne({ _id: cardList_id }).exec();
    if (cardList.cards.length > 0) {
      cardList.cards = [card._id, ...cardList.cards];
    } else {
      cardList.cards = [card._id];
    }
    await cardList.save();

    res.status(200).json(card);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const postCardList = async (req, res) => {
  try {
    const newCardList = req.body;
    const user_id = req.user;

    const cardList = new CardList(newCardList);
    await cardList.save();
    const user = await User.findOne({ _id: user_id }).exec();

    user.cardLists = [cardList._id, ...user.cardLists];
    await user.save();

    res.status(200).json({ message: "card added succesfuly" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const expandCardListAI = async (req, res) => {
  try {
    const cardList_id = req.params.id;
    const user_id = req.params.user;
    console.log("expanding card list");
    const cardList = await CardList.findOne({ _id: cardList_id })
      .populate("cards")
      .exec();
    console.log(cardList);
    const user = await User.findOne({ _id: user_id }).exec();
    const newCards = await getOpenAIResponse(cardList.cards);
    const insertedCards = [];
    for (const card in newCards) {
      const current_card = new Card(newCards[card]);
      const savedCard = await current_card.save();
      insertedCards.push(savedCard._id);
    }

    console.log(insertedCards);
    cardList.cards = [...insertedCards, ...cardList.cards];
    //console.log(user)
    console.log(cardList);
    //await user.save()
    await cardList.save();
    res.status(200).send("Card List expanded successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
