import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "timesheet.cukt54ow2i2f.ap-southeast-2.rds.amazonaws.com",
  port: 3306,
  user: "whjqb",
  password: "whjqb1984",
  database: "timesheet",
});

connection.connect((err) => {
  if (err) throw err;
  console.time("mysql");
  console.log("Successfully connected to mysql");
  connection.end();
});

const articlesInfo = {
  "learn-react": {
    upvotes: 0,
    comments: [],
  },
  "learn-node": {
    upvotes: 0,
    comments: [],
  },
  "my-thoughts-on-resumes": {
    upvotes: 0,
    comments: [],
  },
};

const app = express();

app.use(bodyParser.json());

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;

  articlesInfo[articleName].upvotes += 2;
  res
    .status(200)
    .send(
      `${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!`
    );
});

app.post("/api/articles/:name/add-comment", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  articlesInfo[articleName].comments.push({ username, text });

  res.status(200).send(articlesInfo[articleName]);
});

app.listen(8000, () => console.log("Listening on port 8000"));
