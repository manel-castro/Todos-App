const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
// app.listen(port, "192.168.1.42");
app.listen(port, "localhost");
console.log("Listening on port ", port);
