import express from "express";
import { addNews } from "../controller/newsController.js";

const newsRouter = express.Router();

newsRouter.route("/addNews").post(addNews);

export default newsRouter;