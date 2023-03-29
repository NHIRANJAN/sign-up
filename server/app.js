const express = require("express");
const app = express();
const port = process.env.port || 9000;
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const bcryptjs = require("bcryptjs");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.dbpassword,
  database: process.env.dbname,
});

db.connect((err) => {
  if (err) console.log(err.message);
  else console.log("Works");
});
app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashpass = await bcryptjs.hash(password, 10);

  db.query("select * from login where email = ?", [email], (err, result) => {
    if (err) console.log(err);
    else {
      if (result.length > 0) {
        return res.send({
          status: "err",
          msg: "Email Already Exist !!!",
          class: "err",
        });
      }
      db.query(
        "insert into login(email,password) values(?,?)",
        [email, hashpass],
        (err, result) => {
          if (err) console.log(err);
          else {
            //   console.log(result);
          }
        }
      );
      return res.send({
        status: "noerr",
        msg: "Registration Completed :)",
        class: "noerr",
      });
    }
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    db.query(
      "select * from login where email = ?",
      [email],
      async (err, result) => {
        if (err) console.log(err);
        else {
          // console.log(result);
          if (result.length == 0) {
            return res.send({
              status: "err",
              msg: "Enter Valid Email and Password !!!",
              class: "err",
            });
          }
          const isValid = await bcryptjs.compare(password, result[0].password);
          if (!isValid) {
            return res.send({
              status: "err",
              msg: "Enter Valid Email and Password !!!",
              class: "err",
            });
          }

          //After Login

          const userdata = result[0];
          console.log(userdata);

          res.send({
            status: "noerr",
            msg: "Login Successful :)",
            class: "noerr",
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Server Runs on Port ${port}`);
});
