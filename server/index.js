const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');
const measuresRoutes = require('./routes/measuresRoutes');
const projectRoutes = require('./routes/projectRoutes');
const artisansRoutes = require('./routes/artisansRoutes');
const companyRoutes = require('./routes/companyRoutes');
const taskRoutes = require('./routes/tasksRoutes');
const taskRoutes = require('./routes/tasksRoutes');
const cors = require('cors');

require('dotenv').config();

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(cors({
    origin: process.env.API_CORS,
    credentials: true
}));

app.use('/auth', authRoutes);
app.use('/', homeRoutes);
app.use('/', userRoutes);
app.use('/', activityRoutes)
app.use('/', measuresRoutes);
app.use('/', projectRoutes);
app.use('/', artisansRoutes)
app.use('/', companyRoutes)
app.use('/', taskRoutes)
app.use('/', taskRoutes)

// Server can start with "npm start and will listen on port 3000"
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});