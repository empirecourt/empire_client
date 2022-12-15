import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/store';
import Booking from './components/Booking';
import UserPrivateRoute from './components/UserPrivateRoute';
import { setUsers } from './features/userSlice';
import AllEvents from './pages/AllEvents';
import Event from './pages/Event';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Users from './pages/users';

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
      <Route path='/users' element={<Users />} /> 
      <Route path='/adminPage' element={<AllEvents />} />
      <Route path='/event' element={<Event />} />
      <Route path='/homepage' element={
      <UserPrivateRoute>
      <HomePage />
      </UserPrivateRoute>
      } />
      <Route path='/booking' element={<Booking />} />
      </Routes>
    </div>
  );
}

export default App;


