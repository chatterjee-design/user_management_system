const express = require('express');
const path = require('path');
require('dotenv').config();
const router = require('./Route/userRoute');
const {connectToDB} = require('./Config/db');
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 4000



// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../Client'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  }));
  const staticPath = path.join(__dirname, '../Client')
app.use(express.static(staticPath))


//app.options('*', cors(corsOptions)); // Configure preflight requests

// Routes setup
app.use('/', router);


app.listen(port, async ()=>{
    await connectToDB();
    console.log(`listening on http://localhost:${port}`)
})