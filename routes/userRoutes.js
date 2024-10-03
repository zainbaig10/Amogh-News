import express from "express";
import {
  changePassword,
  createUser,
  getAllWithPagination,
  getByUserId,
  getUserByRole,
  login,
  updateUser,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.route("/createUser").post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/updateUser").post(updateUser);
userRouter.route("/getByUserId/:id").get(getByUserId);
userRouter.route("/getAllWithPagination").get(getAllWithPagination);
userRouter.route("/getUserByRole/:role").get(getUserByRole);
userRouter.route("/changePassword").post(changePassword);

export default userRouter;
