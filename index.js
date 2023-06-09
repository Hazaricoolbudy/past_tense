const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const nlp = require("compromise");
const router = express.Router();
nlp.extend(require("compromise-sentences"));
const port = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);
router.get("/past-tense", (req, res) => {
  console.log(req.query);
  let doc = nlp(req.query.sentance);
  doc.sentences().toPastTense();
  const text = doc.text();
  console.log(text);
  res.json({ text });
});

http.createServer(app).listen(port, () => {
  console.log(`app is runnign on port ${port}`);
});
