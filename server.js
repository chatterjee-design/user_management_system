const express = require('express');
require('dotenv').config();
const router = require('./Route/userRoute');
const {connectToDB} = require('./Config/db');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 4000



// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Routes setup
app.use('/', router);


app.listen(port, async ()=>{
    await connectToDB();
    console.log(`listening on http://localhost:${port}`)
})