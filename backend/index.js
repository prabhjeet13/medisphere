// server building
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// built-in middlewares for parsing data
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

//routes
const adminRoutes = require('./Routes/Admin');
const patientRoutes = require('./Routes/Patient');;
const specializationRoutes = require('./Routes/Specialization');
const doctorRoutes = require('./Routes/Doctor');
const otpRoutes = require('./Routes/Otp');
app.use('/api/v1/admin',adminRoutes);
app.use('/api/v1/patient',patientRoutes);
app.use('/api/v1/specialization',specializationRoutes);
app.use('/api/v1/doctor',doctorRoutes);
app.use('/api/v1/otp',otpRoutes);




// listening port
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});


// db
const {dbConnect} = require('./Config/Database');
dbConnect();



