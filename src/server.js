import express from 'express';
import bodyParser from 'body-parser';
import { router as filteredImageRoutes } from './routes/filteredImageRoutes.js'

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
app.get( "/", async (req, res) => {
  res.status(200).send("Welcome To Help Find Missing People Project");
} );

app.use(filteredImageRoutes);

app.listen(port, () => {
    console.log(`server running http://localhost:${ port }`);
    console.log('press CTRL+C to stop server');
} );
