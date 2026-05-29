const express = require("express");
require("dotenv").config();

const routes = require("./api/routes");

const app = express();

app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Servicio API pedidos corriendo en el puerto ${PORT}`
  );
});