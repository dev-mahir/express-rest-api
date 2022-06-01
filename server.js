const express = require('express');
const dotenv = require('dotenv');
const studentRouter = require('./routes/student.route');
const app = express();


 // environment variables init
dotenv.config();
const PORT = process.env.SERVER_PORT || 5050;


 // Request body init 
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));

//  student routes 
app.use('/api/student', studentRouter);
 

// express api server listener handler 
app.listen( PORT, ()=> {
    console.log(`server is running at ${PORT}`);
});


