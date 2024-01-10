const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3001;

mongoose.connect("mongodb://localhost:27017/store", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const qnaAdminRoutes = require("./routes/qnaAdminRoutes");
const CategoryRoutes = require("./routes/CategoryRoutes");

app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api/qna", qnaAdminRoutes);
app.use("/api/category", CategoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
