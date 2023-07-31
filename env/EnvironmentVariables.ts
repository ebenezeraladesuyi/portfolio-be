import dotenv from "dotenv";

dotenv.config();

export const EnvironmentVariables = {
  Port: process.env.Port,
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  GOOGLE_REFRESHTOKEN: process.env.GOOGLE_REFRESHTOKEN,
  GOOGLE_REDIRECT: process.env.GOOGLE_REDIRECT,
};
