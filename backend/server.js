const express = require('express');
// const connectDB = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config()




const app = express();
// connect Mongoose

mongoose.connect(process.env.MONGODB).then(()=>console.log
('Conneted to mongo db')).catch((err)=>console.log(err))
// Connect to database
// connectDB();

// Middleware
app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
      optionsSuccessStatus: 200,
      methods: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
    })
  ); 
app.use(bodyParser.json());




// Define routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/disaster', require('./routes/disasterRoute'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/admin', require('./routes/adminRoute'));
app.use('/api/data', require('./routes/reportRoute'));
app.use('/api/upload', require('./routes/uploadRoute'))

const PORT = process.env.PORT || 4000;
mongoose.connection.once('open', () => {
  console.log('database is connected')
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
