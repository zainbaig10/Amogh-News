import express from "express";
import {
  addNews,
  getAllNews,
  getAllNewsWithPagination,
  getNewsByCategory,
  getNewsById,
} from "../controller/newsController.js";

const newsRouter = express.Router();

newsRouter.route("/addNews").post(addNews);
newsRouter.route("/getAllNews").get(getAllNews);
newsRouter.route("/getAllNewsWithPagination").get(getAllNewsWithPagination);
newsRouter.route("/getNewsById/:id").get(getNewsById);
newsRouter.route("/getNewsByCategory/:category").get(getNewsByCategory);

export default newsRouter;
