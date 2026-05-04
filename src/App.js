import logo from './logo.svg';
import './App.css';
import Register from './Register';
import { BrowserRouter, Route,Routes } from 'react-router';
import AdminDash from './AdminDash';
import UserDash from './UserDash';
import AddGrounds from './AddGrounds';
import { ManageUsers } from './ManageUsers';
import { ManageGrounds } from './ManageGrounds';
import { UpdateGround } from './UpdateGround';
import { BookGround } from './BookGround';

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
    
      </Routes>
      </BrowserRouter>
     

    </div>
  );
}

export default App;
