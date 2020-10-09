const express = require("express");
const routes = require("./routes.js");

const app = express();
app.use(express.json());

routes(app);

app.listen(3000);
