const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const cors = require('cors')

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/', homeRoutes);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// Server can start with "npm start and will listen on port 3000"
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});