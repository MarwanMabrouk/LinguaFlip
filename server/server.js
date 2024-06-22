import express from "express";
import cors from "cors";
//import records from "./routes/record.js";
import {userRoutes} from './routes/user.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import { cardListsRoutes } from "./routes/cardLists.js";

//const PORT = process.env.PORT || 5050;
const app = express();

//routes
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
//app.use("/record", records);
app.use("/api/user", userRoutes);
app.use("/api/cardLists", cardListsRoutes);

// connect to db
mongoose.connect(process.env.ATLAS_URI)
  .then(() =>{
      // start the Express server
      app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
});
  })
  .catch((error) =>{
    console.log(error);
  })


