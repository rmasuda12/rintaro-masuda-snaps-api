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
        res.send("Error: could not grab photo info");
    };

})

route.get("/:id", (req, res) => {
    try {
        const dataBuffer = fs.readFileSync("./data/photos.json");
        const photosData = JSON.parse(dataBuffer);
        const photo = photosData.find((photo)=>photo.id === req.params.id);
        console.log(photo)
        if (!photo) {
            res.status(404).send("Error: photo with specified id does not exist");
        }

        res.send(photo);

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

route.get("/:id/comments", (req, res)=>{
    try {
        const dataBuffer = fs.readFileSync("./data/photos.json");
        const photosData = JSON.parse(dataBuffer);
        const photo = photosData.find((photo)=> photo.id===req.params.id);
        if (!photo) {
            res.status(404).send("Error: photo with specified id does not exist");
        }

        res.send(photo.comments);

    } catch (error) {
        res.send(error)
    }
})

route.post("/:id/comments", (req, res)=> {

    if (!req.body.name || !req.body.comment) {
        res.status(400).send("Error: name and/or comment in the body is empty. Please try again")
    }
    
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
        const photo = photosData.find((photo) => photo.id === req.params.id);

        if (!photo) {
            res.status(404).send("Error: photo with specified id does not exist");
        }

        photosData.forEach(element => {
            if (element.id === req.params.id) {
                element.comments.push(newComment);
                res.send(element.comments);
            }
        });

        fs.writeFileSync("./data/photos.json", JSON.stringify(photosData));

    } catch (error) {
        res.send(error);
    }
})
 
export default route;
