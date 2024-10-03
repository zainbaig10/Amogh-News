import express from "express";
import {
  addNews,
  deleteNewsById,
  getAllNews,
  getAllNewsWithPagination,
  getBreakingNews,
  getNewsByCategory,
  getNewsById,
  getNewsByMediaType,
  updateNews,
} from "../controller/newsController.js";

const newsRouter = express.Router();

newsRouter.route("/addNews").post(addNews);
newsRouter.route("/getAllNews").get(getAllNews);
newsRouter.route("/getAllNewsWithPagination").get(getAllNewsWithPagination);
newsRouter.route("/getNewsById/:id").get(getNewsById);
newsRouter.route("/getNewsByCategory/:category").get(getNewsByCategory);
newsRouter.route("/deleteNewsById/:id").delete(deleteNewsById);
newsRouter.route("/getNewsByMediaType/:mediaType").get(getNewsByMediaType);
newsRouter.route("/getBreakingNews").get(getBreakingNews);
newsRouter.route("/updateNews/:id").post(updateNews);

export default newsRouter;
