const express = require("express");

const router = express.Router();

router.get("/me", (req, res) => {
    if (req) {
      const postData = Math.random() * (100 - 1) + 1;
      res.status(200).send({
        message: "Bet placed",
        betValue: postData
      });
    } else {
      res.status(404).send({
        message: "something went wrong",
      });
    }
});

export default router;
