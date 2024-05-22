const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/auth', authRoutes);

// Server can start with "npm start and will listen on port 3000"
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});