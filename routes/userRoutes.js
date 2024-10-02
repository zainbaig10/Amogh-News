import express from "express";
import { createUser, getAllWithPagination, getByUserId, login, updateUser } from "../controller/userController.js";

const userRouter = express.Router();
userRouter.route("/createUser").post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/updateUser").post(updateUser);
userRouter.route("/getByUserId/:id").get(getByUserId);
userRouter.route("/getAllWithPagination").get(getAllWithPagination);

export default userRouter;
