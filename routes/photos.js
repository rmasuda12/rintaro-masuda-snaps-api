import express from "express";
import fs from "fs";
import crypto from "crypto";

const route = express.Router();

const dataBuffer = fs.readFileSync("./data/photos.json");
const photosData = JSON.parse(dataBuffer);

route.get("/", (req, res) => {
    try {
        const dataBuffer = fs.readFileSync("./data/photos.json");
        const photosData = JSON.parse(dataBuffer);
        res.send(photosData);        
    } catch (error) {
        res.status(500).send("error: could not grab photo info");
    }

})

route.get("/:id", (req, res) => {
    try {
        const dataBuffer = fs.readFileSync("./data/photos.json");
        const photosData = JSON.parse(dataBuffer);
        res.send(photosData.find((photo)=>photo.id === req.params.id))
    } catch (error) {
        res.send("erro: could not grab photo with specified id")
    }
})

route.get("/:id/comments", (req, res)=>{
    try {
        const dataBuffer = fs.readFileSync("./data/photos.json");
        const photoData = JSON.parse(dataBuffer);
        res.send(photosData.find((photo)=> photo.id===req.params.id).comments);
    } catch (error) {
        res.send(error);
    }
})

route.post("/:id/comments", (req, res)=> {

    const newComment = {
        name: req.body.name,
        comment: req.body.comment,
        id: crypto.randomUUID(),
        timestamp: Date.now()
    }

    try {
        //get comments
        const dataBuffer = fs.readFileSync("./data/photos.json");
        const photosData = JSON.parse(dataBuffer);
        console.log("Before adding",photosData.find((photo)=> photo.id === req.params.id))
        // find object with id and go to comment
        photosData.forEach(element => {
            if (element.id === req.params.id) {
                element.comments.push(newComment);
                res.send(element.comments);
            }
        });
        fs.writeFileSync("./data/photos.json", JSON.stringify(photosData));
        console.log("After Adding",photosData.find((photo)=> photo.id === req.params.id))

    } catch (error) {
        res.send(error);
    }
})
 
export default route;
