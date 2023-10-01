import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import { upload } from './util/S3Client.js';
import { filterImageFromURL, validateURL } from './util/util.js';

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */

//! END @TODO1
const port = process.env.PORT;

// Init the Express application
const app = express();

// Use the body parser middleware for post requests
app.use(bodyParser.json());

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.status(200).send("Image Processing Microservice on AWS");
});

app.get("/filteredimage", async (req, res) => {
  try {
    let image_url = req.query.image_url
    image_url = image_url.replaceAll("\"", "")
    let isTrue = validateURL(image_url)
    if (isTrue) {
      await filterImageFromURL(req.query.image_url)
      upload();
      return res.status(200).send("Image Uploaded Successfully");
    } else return res.status(422).send("This is not an image url")
  } catch (error) {
    return res.status(500).send("Internal Server Error: " + error);
  } finally {
    fs.rmSync(process.env.LOCAL_PATH, { recursive: true, force: true })
  }
});

app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log('press CTRL+C to stop server');
});
