const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const app = express();


// Server can start with "npm start"

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});