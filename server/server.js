import express from "express";
import cors from "cors";
//import records from "./routes/record.js";
import 'dotenv/config';
import mongoose from 'mongoose';

import {userRoutes} from './routes/user.js';
import {translateRoutes} from './routes/translate.js';
import { cardListsRoutes } from "./routes/cardLists.js";
import https from 'https';
import fs from 'fs';
// const PORT = process.env.PORT || 5050;
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
app.use("/api/services",translateRoutes);
let server;
try{
  
  const privateKey = fs.readFileSync(process.env.KEY_PATH, 'utf8');
  const certificate = fs.readFileSync(process.env.CERT_PATH, 'utf8');
  const ca = fs.readFileSync(process.env.CA_PATH, 'utf8');
  const credentials = { key: privateKey, cert: certificate,ca:ca };
  const httpsServer = https.createServer(credentials, app);
  server = httpsServer;
}catch(error){
  /* console.log(error); */
  console.log("Failed to create https server, falling back to http");
  server = app;
}
// connect to db
mongoose.connect(process.env.ATLAS_URI)
  .then(() =>{
      // start the Express server
      server.listen(process.env.PORT,"0.0.0.0", () => {
      console.log(`Server listening on port ${process.env.PORT}`);
});
  })
  .catch((error) =>{
    console.log(error);
  })


