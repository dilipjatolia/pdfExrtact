'use strict';
const listAllBlobs = require('./listBlobs.js');
const express = require("express");
const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");

    const app = express();
    app.set("view engine", "ejs");
    
    //form-urlencoded
    
    app.use(express.static("views"));
    
    //assuming app is express Object.
    app.get("/", function (req, res) {
      res.sendFile(__dirname+"/views/index.html");
    });
    
    app.post("/upload-file", (req, res) => {
      console.log("post:",req.body.numberOfFiles)
      const listOfBlobs = listAllBlobs.listAllBlobs(req.body.numberOfFiles);
      console.log("files:",listOfBlobs)
      res.render('output',{data:pdfData});
      })
    
    app.listen("5000");
    
    const readPdf = async (uri,res) => {
     
    };
    
    const parseData = (data) => {
      console.log(data);
      pdfData.info = data.info;
      pdfData.numPage = data.numpages;
      let textArray = data.text.split("\n");
      for (let i = 0; i < textArray.length; i++) {
        switch (i) {
          case 2:
            pdfData.name = textArray[i];
            break;
          case 3:
            let subText = textArray[i].split(" ");
            pdfData.phNum = subText[0];
            subText.shift();
            pdfData.address = subText.toString();
            break;
          case 4:
            let subText1 = textArray[i].split("com");
            pdfData.eMail = subText1[0] + "com";
            pdfData.pin = subText1[1];
            break;
        }
      }
      console.log(pdfData);
    };
    