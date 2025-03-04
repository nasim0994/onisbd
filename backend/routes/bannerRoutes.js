const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getBanner,
  addBanner,
  updateBanner,
} = require("../controllers/bannerController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/banner");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`
    );
  },
});
const upload = multer({ storage: storage }).fields([{ name: "gallery" }]);

router.get("/all", getBanner);
router.post("/add", upload, addBanner);
router.patch("/update/:id", upload, updateBanner);

module.exports = router;
