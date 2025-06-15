import express from "express";
const app = express();

const port = 8080;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

app.use((req, res, next) => {
  req.requestTime = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.requestTime);
  next();
});

app.get("/", (req, res) => {
  res.send("root page");
});
