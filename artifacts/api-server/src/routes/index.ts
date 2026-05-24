import { Router, type IRouter } from "express";
import healthRouter from "./health";
import carsRouter from "./cars";
import bookingsRouter from "./bookings";
import reviewsRouter from "./reviews";
import branchesRouter from "./branches";

const router: IRouter = Router();

router.use(healthRouter);
router.use(carsRouter);
router.use(bookingsRouter);
router.use(reviewsRouter);
router.use(branchesRouter);

export default router;
