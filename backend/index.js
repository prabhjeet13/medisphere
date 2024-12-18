// server building
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;


//routes
const adminRoutes = require('./Routes/Admin');
const patientRoutes = require('./Routes/Patient');;
const specializationRoutes = require('./Routes/Specialization');
const doctorRoutes = require('./Routes/Doctor');
app.use(adminRoutes);
app.use(patientRoutes);
app.use(specializationRoutes);
app.use(doctorRoutes);


// built-in middlewares for parsing data
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());


// listening port
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});


// db
const {dbConnect} = require('./Config/Database');
dbConnect();



