const express = require("express");
const router = require("./routes");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use("/v1", router);

app.listen(3000, (port) => {
  console.log(`Server is listening at port ${port}`);
});
