const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Ema jon server is runing");
});

app.listen(port, () => {
  console.log("Server running at port", port);
});
