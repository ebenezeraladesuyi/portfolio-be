import cors from "cors";
import express, { Application, Request, Response } from "express";
import { EnvironmentVariables } from "./env/EnvironmentVariables";
import { google } from "googleapis";
import * as nodemailer from "nodemailer";

const app: Application = express();

app.use(express.json()).use(cors());

const GOOGLE_ID = EnvironmentVariables.GOOGLE_ID;
const GOOGLE_SECRET = EnvironmentVariables.GOOGLE_SECRET;
const GOOGLE_REFRESHTOKEN = EnvironmentVariables.GOOGLE_REFRESHTOKEN;
const GOOGLE_REDIRECT = EnvironmentVariables.GOOGLE_REDIRECT;

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });

app.post("/mailer", async (req: Request, res: Response) => {
  const { email, messages, subject } = req.body;

  try {
    const getAccessToken: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ogbonnafinbarr@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESHTOKEN,
        accessToken: EnvironmentVariables.accessTOKEN,
      },
    });

    const message = {
      from: email,
      to: "ogbonnafinbarr@gmail.com",
      subject: subject,
      text: messages,
    };

    transport.sendMail(message);
    res.status(400).json({
      message: "Mail sent",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error occured",
      data: error,
    });
  }
});

app.listen(2004, () => {
  console.log(`Server is running on port 2004`);
});
