import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import photoController from "../controllers/photo";

const router = new Router();

router.post("/photos", loginRequired, photoController.store);

export default router;
