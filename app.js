const express = require("express");
const app = express();
const morgan = require("morgan");
const main = require("./views/main");
const layout = require("./views/layout");
const { db } = require("./models");
const models = require("./models");

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "./public"));

app.get("/", (req, res) => {
  res.send(main());
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

const PORT = 3000;

const init = async () => {
  await models.db.sync();
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
