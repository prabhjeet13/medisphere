import logo from './logo.svg';
import './App.css';
import Navbar from './Components/common/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Otp from './Pages/Otp';
import AllDoctors from './Pages/AllDoctors';
import DoctorsOnSpeciality from './Pages/DoctorsOnSpeciality';
import Doctor from './Pages/Doctor';
import MyProfile from './Pages/MyProfile';
import Dashboard from './Pages/Dashboard';
import AppoinmentsDone from './Pages/AppoinmentsDone';
import NextAppointments from './Pages/NextAppointments';
import Edit_Time_Slots from './Pages/Edit_Time_Slots';
import EditDetails from './Pages/EditDetails';
import AdminSignin from './Pages/AdminSignin';
import AdminSignup from './Pages/AdminSignup';
import AddSpecialization from './Pages/AddSpecialization';
import GivePermission from './Pages/GivePermission';
function App() {
  return (
    <div className='mx-auto bg-gradient-to-r from-blue-700 to-blue-900 min-h-[100vh]'>
        <Navbar/>
        <Routes>
              <Route path='/' element = {<Home/>}></Route>
              <Route path='/about' element = {<About/>}></Route>
              <Route path='/contact' element = {<Contact/>}></Route>
              <Route path='/doctors' element = {<AllDoctors/>}></Route>
              <Route path='/signin' element = {<Login/>}> </Route>
              <Route path='/signup' element = {<Signup/>}> </Route>
              <Route path='/doctors/:speciality' element = {<DoctorsOnSpeciality/>}> </Route>
              <Route path='/doctor/:doctorId' element = {<Doctor/>}> </Route>
              <Route path='/admin/signin' element = {<AdminSignin/>}> </Route>
              <Route path='/admin/signup' element = {<AdminSignup/>}> </Route>
              <Route path='/dashboard' element = {<Dashboard/>}>
                  <Route path='myprofile' element = {<MyProfile/>}> </Route>
                  <Route path='editdetails' element = {<EditDetails/>}> </Route>
                  <Route path='edit_time_slots' element = {<Edit_Time_Slots/>}> </Route>
                  <Route path='nextappointments' element = {<NextAppointments/>}> </Route>
                  <Route path='appointments_done' element = {<AppoinmentsDone/>}> </Route>
                  <Route path='addspecialization' element = {<AddSpecialization/>}> </Route>
                  <Route path='givepermission' element = {<GivePermission/>}> </Route>
              </Route>
              <Route path='/otp' element = {<Otp/>}></Route>
        </Routes>
    </div>  
  );
}

export default App;
