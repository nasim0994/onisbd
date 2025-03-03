const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4701;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// routers
const userRoutes = require("./routes/userRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");
const bannerRouter = require("./routes/bannerRoutes.js");
const businessRouter = require("./routes/businessRoutes.js");
const faqRouter = require("./routes/faqRoutes.js");
const faqSection = require("./routes/faqSectionRoutes.js");

const logoRouter = require("./routes/logoRoutes");
const faviconRouter = require("./routes/faviconRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const featureSection = require("./routes/featureSectionRoutes.js");
const featureRouter = require("./routes/featureRoutes.js");
const seoRouter = require("./routes/seoRoutes.js");
const { defaultAdminCreate } = require("./controllers/userController.js");

// Connect Database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
  defaultAdminCreate();
});

app.use("/user", userRoutes);
app.use("/order", orderRouter);
app.use("/banner", bannerRouter);
app.use("/business", businessRouter);
app.use("/faq", faqRouter);
app.use("/logo", logoRouter);
app.use("/favicon", faviconRouter);
app.use("/product", productRouter);
app.use("/feature", featureRouter);
app.use("/featureSection", featureSection);
app.use("/faqSection", faqSection);
app.use("/seo", seoRouter);

app.get("/", (req, res) => {
  res.send(`server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
