import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import {userRoutes} from './routes/user.js';

const PORT = process.env.PORT || 5050;
const app = express();

//routes
app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/user", userRoutes);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
