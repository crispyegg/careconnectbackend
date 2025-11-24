const express = require("express");
const treatmentModel = require("../model/addTreatment.js");
const multer = require("multer");
const treatmentRouting = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/treatmentUploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });


treatmentRouting.post("/addtreatment", upload.single("timage"), async (req, res) => {
  try {
    const { filename, path } = req.file;

    const { tname, tdescription } = req.body;
    
   const beforeCheck = await treatmentModel.findOne({ tname: tname });
    if (beforeCheck) {
      return res.send("Service already exists");
    } 
    const treatmentData = new treatmentModel({ timage:path, filename, tname, tdescription });
    const result = await treatmentData.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send("Failed to add treatment");
  }
});

treatmentRouting.get("/addtreatment", async (req, res) => {
  try {
    const result = await treatmentModel.find();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

treatmentRouting.delete("/addtreatment/:tid", async (req, res) => {
  try {
    const tid = req.params.tid;
    const result = await treatmentModel.deleteOne({ _id: tid });
    res.send(result);
  } catch (err) {
    res.send("unable to delete the data");
  }
});

treatmentRouting.get("/addtreatment/:tid", async (req, res) => {
  try {
    const tid = req.params.tid;
    const result = await treatmentModel.findOne({ _id: tid });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

treatmentRouting.put("/addtreatment/:tid", async (req, res) => {
  try {
    const tid = req.params.tid;
    const result = await treatmentModel.updateOne(
      { _id: tid },
      { $set: req.body }
    );
    res.send(result);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = treatmentRouting;
