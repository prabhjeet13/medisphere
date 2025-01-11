// server building
const express = require('express');
// const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

const {app,server} = require('./socket/Socket');

const cors = require('cors');
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
)



// built-in middlewares for parsing data
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

//routes
const adminRoutes = require('./Routes/Admin');
const patientRoutes = require('./Routes/Patient');
const specializationRoutes = require('./Routes/Specialization');
const doctorRoutes = require('./Routes/Doctor');
const otpRoutes = require('./Routes/Otp');
const messageRoutes = require('./Routes/message');

app.use('/api/v1/admin',adminRoutes);
app.use('/api/v1/patient',patientRoutes);
app.use('/api/v1/specialization',specializationRoutes);
app.use('/api/v1/doctor',doctorRoutes);
app.use('/api/v1/otp',otpRoutes);
app.use('/api/v1/messages',messageRoutes);

const {dbConnect} = require('./Config/Database');

// listening port
server.listen(PORT, () => {
    dbConnect();
    console.log(`listening on ${PORT}`);
});


// db



