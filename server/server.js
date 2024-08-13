import express from "express";
import cors from "cors";
import 'dotenv/config';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import { userRoutes } from './routes/user.js';
import { translateRoutes } from './routes/translate.js';
import { cardListsRoutes } from "./routes/cardLists.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/cardLists", cardListsRoutes);
app.use("/api/services", translateRoutes);

// HTTPS server setup
let server;
try {
  const privateKey = fs.readFileSync(process.env.KEY_PATH, 'utf8');
  const certificate = fs.readFileSync(process.env.CERT_PATH, 'utf8');
  const ca = fs.readFileSync(process.env.CA_PATH, 'utf8');
  const credentials = { key: privateKey, cert: certificate, ca: ca };
  const httpsServer = https.createServer(credentials, app);
  server = httpsServer;
} catch (error) {
  console.log("Failed to create HTTPS server, falling back to HTTP");
  server = app;
}

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    // Start the server
    const port = process.env.PORT || 5050;
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
