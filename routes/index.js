import expressRouter from "express";
import newsRouter from "./newRoutes.js";
import userRouter from "./userRoutes.js";

const router = expressRouter();

router.use("/user", userRouter);
router.use("/News", newsRouter);

export default router;
