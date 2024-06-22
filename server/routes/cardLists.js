import express from "express";


// contoller functions
import {fetchUserCardLists, fetchCards, postCard, postCardList} from '../controllers/cardListController.js';
import { requireAuth } from "../middleware/requireAuth.js";

export const cardListsRoutes = express.Router();

cardListsRoutes.use(requireAuth);

cardListsRoutes.get('/',fetchUserCardLists);

cardListsRoutes.post('/',postCardList);

cardListsRoutes.get('/:id',fetchCards);

cardListsRoutes.post('/:id',postCard);

