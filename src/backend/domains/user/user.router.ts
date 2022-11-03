import express from "express";
import { onlyAuthorized } from "./middlewares/only-authorized.middleware";
import { getUserData, loginUser, registerUser } from "./user.controllers";

export const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from user api !" });
});

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post(
  "/get-user-data",
  onlyAuthorized,
  getUserData
);
