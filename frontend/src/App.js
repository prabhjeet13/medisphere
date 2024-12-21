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
              <Route path='/otp' element = {<Otp/>}></Route>
        </Routes>
    </div>  
  );
}

export default App;
