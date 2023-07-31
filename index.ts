import cors from "cors";
import express, { Application } from "express";
import { EnvironmentVariables } from "./env/EnvironmentVariables";
import { google } from "googleapis";
import * as nodemailer from "nodemailer";

const app: Application = express();

const Port = EnvironmentVariables.Port;

app.use(express.json()).use(cors());

const GOOGLE_ID = EnvironmentVariables.GOOGLE_ID;
const GOOGLE_SECRET = EnvironmentVariables.GOOGLE_SECRET;
const GOOGLE_REFRESHTOKEN = EnvironmentVariables.GOOGLE_REFRESHTOKEN;
const GOOGLE_REDIRECT = EnvironmentVariables.GOOGLE_REDIRECT;

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
