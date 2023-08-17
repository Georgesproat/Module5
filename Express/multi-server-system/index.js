const express = require("express");
const app = express();
const port = 3000;
const testRoutes = require("./routes/myTestRoutes");
const calculatorRoute = require("./routes/calculatorRoute");
const friendRoutes = require("./routes/friendRoutes");
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use("/", express.static("public"));
app.use("/mytest", testRoutes);
app.use("/calculator", calculatorRoute);
app.use("/friends", friendRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app
listening at
http://localhost:${port}`);
});
