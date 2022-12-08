import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/store';
import Booking from './components/Booking';
import { setUsers } from './features/userSlice';
import AllEvents from './pages/AllEvents';
import Event from './pages/Event';
import HomePage from './pages/HomePage';
import Login from './pages/Login';

function App() {

  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user') || "false");
useEffect(() => {
 dispatch(setUsers(user));
}, [dispatch, user]);
  return (
    <div>
     <Routes>
      <Route path='/' element={<Login />} />
      {/* <Route path='/calendar' element={<Calender />} /> */}
      <Route path='/adminPage' element={<AllEvents />} />
      <Route path='/event' element={<Event />} />
      <Route path='/homepage' element={<HomePage />} />
      <Route path='/booking' element={<Booking />} />
      </Routes>
    </div>
  );
}

export default App;


