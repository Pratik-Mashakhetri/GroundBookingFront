import logo from './logo.svg';
import './App.css';
import Register from './Register';
import { BrowserRouter, Route,Routes } from 'react-router';
import AdminDash from './AdminDash';
import UserDash from './UserDash';
import AddGrounds from './AddGrounds';
import  ManageUsers  from './ManageUsers';
import { ManageGrounds } from './ManageGrounds';
import { UpdateGround } from './UpdateGround';
import { BookGround } from './BookGround';
import { MyBookings } from './MyBookings';
import { GroundDetails } from './GroundDetails';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import AdminContact from './AdminContact';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/AdminDash' element={<AdminDash/>}></Route>
        <Route path='/UserDash' element={<UserDash/>}></Route>
        <Route path='/registerUser' element={<Register/>}></Route>
        <Route path="/addGrounds" element={<AddGrounds/>}></Route>
        <Route path='/manageUsers' element={<ManageUsers/>}></Route>
        <Route path='/manageGrounds' element={<ManageGrounds/>}></Route>
        <Route path="/update-ground/:id" element={<UpdateGround />} />
        <Route path='/bookground' element={<BookGround/>}></Route>
        <Route path='/my-bookings' element={<MyBookings/>}></Route>
        <Route path="/ground/:id" element={<GroundDetails />} />
        <Route path='/about-us' element={<AboutUs/>}></Route>
        <Route path='/contact-us' element={<ContactUs/>}></Route>
        <Route path='/admin-contact' element={<AdminContact/>}></Route>
    
      </Routes>
      </BrowserRouter>
     

    </div>
  );
}

export default App;
