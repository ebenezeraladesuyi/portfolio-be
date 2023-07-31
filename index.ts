import cors from "cors";
import express, { Application } from "express";
import { EnvironmentVariables } from "./env/EnvironmentVariables";

const app: Application = express();

const Port = EnvironmentVariables.Port;

app.use(express.json()).use(cors());

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
