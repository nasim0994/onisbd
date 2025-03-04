const express = require("express");
const router = express.Router();
const singleUploder = require("../utils/singleUploder");
const {
  getFavicon,
  addFavicon,
  updateFavicon,
} = require("../controllers/faviconController");

let uploadFavicon = singleUploder("./uploads/favicon", 100 * 1024, "icon");

router.get("/all", getFavicon);

router.post("/add", (req, res, next) => {
  uploadFavicon(req, res, (err) => {
    if (err) {
      return res.json({
        message: `${err?.message}! max size 100kb`,
        error: err,
      });
    }

    addFavicon(req, res, next);
  });
});

router.patch("/update/:id", (req, res, next) => {
  uploadFavicon(req, res, (err) => {
    if (err) {
      return res.json({
        message: `${err?.message}! max size 100kb`,
        error: err,
      });
    }

    updateFavicon(req, res, next);
  });
});

module.exports = router;
