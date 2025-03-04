const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    galleries: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Banner = mongoose.model("banner", bannerSchema);

module.exports = Banner;
