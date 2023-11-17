//backend will run on port 8080
const express = require("express");
const cors = require("cors");
const { mongoose, models } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const RailwaysUserModel = require("./Schema/RailwaysUserSchema");
const SiddingUserModel = require("./Schema/SidingUserSchema");

const JWT_SECRET = "VeryImportantSecret";
const PORT=8080;
const MONGO_URL='mongodb+srv://sihdatabase:sihdatabase@cluster1.ex799hd.mongodb.net/?retryWrites=true&w=majority';
const app = express();
app.use(express.json());
const jwtSecretKey = JWT_SECRET;
app.use(
    cors({
      origin: ['http://localhost:3000'],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );
const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};
console.log('Backend running')
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });


  app.post("/register/railways/user", async (req, res) => {
    await mongoose.connect(MONGO_URL);
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    try {
      if (email && password && name) {
        const CredentialsDoc = await RailwaysUserModel.create({
          name:name,
          email:email,
          password: await generatePassword(password),
        });
        if (CredentialsDoc) {
          return res.status(200).send(CredentialsDoc);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error");
    }
  });

  app.post("/register/siding/user", async (req, res) => {
    await mongoose.connect(MONGO_URL);
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const stationID=req.body.stationID;
    try {
      if (email && password && name) {
        const CredentialsDoc = await SiddingUserModel.create({
          name:name,
          email:email,
          password: await generatePassword(password),
          stationID:stationID,
        });
        if (CredentialsDoc) {
          return res.status(200).send(CredentialsDoc);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error");
    }
  });

  app.post("/login/railways/user", async (req, res) => {
    console.log("received");
    await mongoose.connect(MONGO_URL);
    const email = req.body.email;
    const password = req.body.password;
    try {
      if (email && password) {
        const CredentialsDoc = await RailwaysUserModel.findOne({ email });
        //console.log(`email found - ${email}`);
        if (CredentialsDoc) {
          const passwordOK = await bcrypt.compare(
            password,
            CredentialsDoc.password
          );
          if (passwordOK) {
            res.status(200).json(CredentialsDoc);
          }
          else{
            res.status(500).json('password does not match');
          }
        }
        else{
          res.status(500).json(null);
        }
      }
    } catch {
      console.log(error);
      res.status(400).send("Server Error");
    }
  });
  app.post("/login/siding/user", async (req, res) => {
    console.log("received");
    await mongoose.connect(MONGO_URL);
    const email = req.body.email;
    const password = req.body.password;
    try {
      if (email && password) {
        const CredentialsDoc = await RailwaysUserModel.findOne({ email });
        //console.log(`email found - ${email}`);
        if (CredentialsDoc) {
          const passwordOK = await bcrypt.compare(
            password,
            CredentialsDoc.password
          );
          if (passwordOK) {
            res.status(200).json(CredentialsDoc);
          }
          else{
            res.status(500).json('password does not match');
          }
        }
        else{
          res.status(500).json(null);
        }
      }
    } catch {
      console.log(error);
      res.status(400).send("Server Error");
    }
  });
