import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongooseConnection from "./mongo.js";
import appRoutes from "./routes/index.js";
import fs from "fs";
import dotenv from "dotenv";
import https from "https";

//Firebase dependencies
import { initializeApp, applicationDefault } from "firebase-admin/app";
import admin from "firebase-admin";
//import serviceAccount from "./config/fir-push-notification-901dd-firebase-adminsdk-byi0j-d2ef435bbc.json" assert { type: "json" };
//const serviceAccount = JSON.parse(fs.readFileSync("./config/fir-push-notification-901dd-firebase-adminsdk-byi0j-d2ef435bbc.json"));
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

mongooseConnection();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   projectId:"fir-push-notification-901dd",
// });

app.get("/health", (req, res) => {
  return res.status(200).json({
    msg: "Server is up and running",
  });
});

app.use("/api", appRoutes);

if (process.env.DEPLOY_ENV === "local") {
  app.listen(4000, (req, res) => {
    console.log(`Server is listening on port ${port}`);
  });
} else if (process.env.DEPLOY_ENV === "prod") {
  const httpsServer = https.createServer(
    {
      cert: fs.readFileSync(process.env.SSL_CRT_PATH),
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
    },
    app
  );

  httpsServer.listen(4000, () => {
    console.log("HTTPS Server running on port 443");
  });
}
