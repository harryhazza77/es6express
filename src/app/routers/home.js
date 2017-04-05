import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("shared/layout");
});

export default router;
