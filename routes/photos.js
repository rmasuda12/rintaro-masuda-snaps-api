import express from "express";
import fs from "fs";
import crypto from "crypto";

const route = express.Router();

route.get("/", (req, res) => {
    try {
        const dataBuffer = fs.readFileSync("./data/photos.json");
        const photosData = JSON.parse(dataBuffer);

        res.send(photosData);        
    } catch (error) {
        res.status(500).send("error: could not grab photos");
    }

})

route.post("/", (req, res)=> {
    res.send("made it to post");
})
 
export default route;
