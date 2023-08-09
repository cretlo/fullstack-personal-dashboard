import express from "express";
const router = express.Router();

router.get("/", (_, res) => {
  res.send("Hello from /events");
});

export default router;
