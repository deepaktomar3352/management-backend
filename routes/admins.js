var express = require("express");
var router = express.Router();
var upload = require("./pool");
var upload = require("./multer");
var pool = require("./pool");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

router.get("/adminlogin", (req, res) => {
  res.render("adminlogin", { message: "" });
});

router.get("/adminlogout", (req, res) => {
  localStorage.clear();
  res.render("adminlogin", { message: "" });
});

router.get("/admindash", (req, res) => {
  pool.query(
    "select * from adminlogin where adminid=?",
    [req.query.adminid],
    (error, result) => {
      if (error) {
        res.render("adminprofile", { message: "query error" });
      } else {
        res.render("adminpage", { result: result[0] });
      }
    }
  );
});

router.post("/chkadminlogin", (req, res) => {
  console.log(req.body.emailaddress);
  console.log(req.body.password);
  pool.query(
    "select * from adminlogin where (emailid=? or mobilenumber=?) and password=?",
    [req.body.emailaddress, req.body.emailaddress, req.body.password],
    (error, result) => {
      if (error) {
        res.status(500).json({ status: false, message: "server error" });
      } else {
        if (result.length == 0) {
          res
            .status(500)
            .json({
              status: false,
              message: "Invalid emailadress/mobilenumber/password",
            });
        } else {
          console.log(result);
          res
            .status(200)
            .json({ status: true, data: result, message: "your are signIn" });
        }
      }
    }
  );
});

router.get("/profile", (req, res) => {
  pool.query(
    "select * from adminlogin where adminid=?",
    [req.query.adminid],
    (error, result) => {
      if (error) {
        console.log(error);
        res.render("adminpage", { message: "server error" });
      } else {
        console.log(result);
        res.render("adminprofile", { result: result[0], message: "success" });
      }
    }
  );
});

// ***************************USED FOR USER CHECK*******************************************************
router.post("/studentchkadminlogin", (req, res) => {
  console.log(req.body.emailaddress);
  console.log(req.body.password);
  pool.query(
    "select * from student_registration where (student_email=? or student_mobile=?) and student_password=?",
    [req.body.emailaddress, req.body.emailaddress, req.body.password],
    (error, result) => {
      if (error) {
        res.status(500).json({ status: false, message: "server error" });
      } else {
        if (result.length == 0) {
          res
            .status(500)
            .json({
              status: false,
              message: "Invalid emailadress/mobilenumber/password",
            });
        } else {
          res
            .status(200)
            .json({
              status: true,
              data: result,
              message: "welcome you are Sign In",
            });
        }
      }
    }
  );
});

router.post("/addevents", upload.single("image"), (req, res) => {
  console.log(req.body);
  const image = req.file ? req.file.originalname : null;
  console.log("img", image);
  pool.query(
    "insert into subevent_of_mainevents (subeventname, description, image, venue, time, date, rules, coordinator, conumber, registrationfee) values(?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.eventName,
      req.body.description,
      image,
      req.body.venue,
      req.body.time,
      req.body.date,
      req.body.rules,
      req.body.coordinator,
      req.body.conumber,
      req.body.registrationfee,
    ]
  ),
    (error, result) => {
      if (error) {
        console.log("Error Occurs", error);
        res.status(400).json({ status: false, message: "Server Error" });
      } else {
        console.log("true", result);
        res.status(200).json({ status: true, message: "Successfully send" });
      }
    };
});

module.exports = router;
