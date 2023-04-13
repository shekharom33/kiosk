const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const kiosk = require("./customer-survey.json");

const PORT = 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

app.use(morgan("dev"));

// var whitelist = ["*"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/Kiosk", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/kiosk/customer-survey", (req, res) => {
  try {
    const customerSurvey = kiosk.find((k) => k.name === "Customer Survey");
    res.json({ success: true, data: customerSurvey });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "No data found", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
