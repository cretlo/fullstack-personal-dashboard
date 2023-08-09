import express from "express";
const router = express.Router();

// middleware test
router.use((req, res, next) => {
  console.log("Hit test middleware");
  res.status(400);
  next();
});

router.get("/", (_, res) => {
  res.send("Hello from /contacts");
});

export default router;
