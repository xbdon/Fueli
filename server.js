import express from "express";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.static(path.join(process.cwd() + "/public")));

app.use((req, res) => {
  if (req.url === "./config.js") {
    const readStream = fs.createReadStream(
      path.join(process.cwd(), "./config.js")
    );
    res.contentType("js");
    readStream.pipe(res);
  }
  res.status(404);
  res.send(`<h1>Error 404: Resource not found</h1>`);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

