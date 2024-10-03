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
  updateBreakingNewsStatus,
  updateBreakingNewsTrue,
} from "../controller/newsController.js";

const newsRouter = express.Router();

newsRouter.route("/addNews").post(addNews);
newsRouter.route("/getAllNews").get(getAllNews);
newsRouter.route("/getAllNewsWithPagination").get(getAllNewsWithPagination);
newsRouter.route("/getNewsById/:id").get(getNewsById);
newsRouter.route("/getNewsByCategory/:category").get(getNewsByCategory);
newsRouter.route("/deleteNewsById/:id").delete(deleteNewsById);
newsRouter.route("/getNewsByMediaType/:mediaType").get(getNewsByMediaType);
newsRouter.route("/updateBreakingNewsStatus").put(updateBreakingNewsStatus);
newsRouter.route("/updateBreakingNews/:id").put(updateBreakingNewsTrue);
newsRouter.route("/getBreakingNews").get(getBreakingNews);

export default newsRouter;
