import expressRouter from "express";
import newsRouter from "./newRoutes.js"

const router = expressRouter();

router.use("/News",newsRouter);

export default router;