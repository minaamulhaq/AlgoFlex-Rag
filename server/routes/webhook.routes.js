import express from "express";

const router = express.Router();

import CreateUser from "../controllers/webhook.controller.js";


router.route("/user").post(express.raw({ type: "application/json" }), CreateUser);


export default router;