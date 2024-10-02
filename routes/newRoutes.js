import express from "express";
import {
  addNews,
  getAllNews,
  getAllNewsWithPagination,
} from "../controller/newsController.js";

const newsRouter = express.Router();

newsRouter.route("/addNews").post(addNews);
newsRouter.route("/getAllNews").get(getAllNews);
newsRouter.route("/getAllNewsWithPagination").get(getAllNewsWithPagination);

export default newsRouter;
