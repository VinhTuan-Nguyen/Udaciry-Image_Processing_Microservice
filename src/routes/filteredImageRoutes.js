import fs from 'fs';
import express, { response } from 'express';
import imageService from '../service/imageService.js';
import { deleteLocalFiles, filterImageFromURL } from '../../util/util.js';

export const router = express.Router();

router.get("/filteredimage", async (req, res) => {
    let image_url = req.query.image_url
    image_url = image_url.replaceAll("\"","")
    let isTrue = imageService.validateURL(image_url);
    if(isTrue) {
        await filterImageFromURL(image_url);
        try {
            await imageService.storeImageToS3();
            return res.status(200).send("Image Uploaded Successfully");
        } catch (error) {
            return res.status(500).send("Internal Server Error");
        } finally {
            deleteLocalFiles(fs.readdirSync(process.env.LOCAL_PATH))
        }
    } else return res.status(400).send("This is not an image url")
});