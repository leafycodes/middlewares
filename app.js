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

const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "give_access") {
    return next();
  }
  throw new Error("ACCESS TOKEN REQUIRED!");
};

app.get("/", (req, res) => {
  res.send("root page");
});

app.get("/api", checkToken, (req, res) => {
  res.send("api returned this data");
});

app.use((req, res) => {
  res.status(404).send("Page Not Found!");
});
