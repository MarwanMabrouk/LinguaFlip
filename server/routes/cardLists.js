import express from "express";
import bodyParser from "body-parser";

// contoller functions
import {
  fetchUserCardLists,
  fetchCards,
  postCard,
  postCardList,
  expandCardListAI,
} from "../controllers/cardListController.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const cardListsRoutes = express.Router();

cardListsRoutes.use(requireAuth);
cardListsRoutes.use(bodyParser.json());

cardListsRoutes.get("/", fetchUserCardLists);

cardListsRoutes.post("/", postCardList);

cardListsRoutes.get("/:id", fetchCards);

cardListsRoutes.post("/:id", postCard);

cardListsRoutes.post("/:id/expandCardList", expandCardListAI);
