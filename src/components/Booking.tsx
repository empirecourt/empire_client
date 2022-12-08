import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/logo.png';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAddBookingMutation, useGetBookingsByUserQuery } from '../features/api/API';
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/userSlice';

const StyledBox = styled(Box)`
background-color: #313552;
margin: 0;
padding: 0;
height: 100vh;

`
const StyledContainer = styled.div`
border-radius: 10px;
padding: 10px;
background: rgba( 255, 255, 255, 0.8 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.35 );
backdrop-filter: blur( 10px );
-webkit-backdrop-filter: blur( 4px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.8);
`
const FormHeaderContainer = styled.div`

`
const Heading = styled.h3`
margin-left: 20px;
text-align: center;  
color: #383838;                    
`
 const Form = styled.form`
 display: flex;
 align-items: center;
 justify-content: center;
 height: 100%;
 width: 100%;
 `
 const FormInnerContainer = styled.div`
 `
 const ImgInput = styled.input`
width: 0;
height: 0;
 `
 const StyledTextField = styled(TextField)`
width: 98%;
margin:  15px 3px 0 4px;
color: gray;
`
const Button = styled.button`
width: 99%;
height: 40px;
margin:  25px 3px 0 4px;
background-color: #9ACD32;
padding: 6px, 12px, 6px, 12px;
color: #fff;
border-radius: 10px;
border: none;
outline: none;
cursor: pointer; 
font-size: 1.1rem;     
`
const Logo = styled.img`
width: 80px;
height: 80px;
border-radius: 20px;
`
const Label = styled.p`

`

function Booking() {

 const initialState = { startDate: '', startTime: '', endDate: '', endTime: '', select: ''};
  const [formData, setFormData] = useState(initialState);
  const {user} = useAppSelector(selectCurrentUser);
  {/* @ts-ignore:next-line */}
  const userId = user?._id;
    const {data} = useGetBookingsByUserQuery(userId)
    {/* @ts-ignore:next-line */}
    const dataList = data?.map((list: any) => list);
const [addBooking, {isSuccess, isError}] =  useAddBookingMutation()
let navigate = useNavigate();
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData, [name]: value});
  };
//  console.log(value);
    const handleSubmit = async (e: any) => {         
      e.preventDefault()
        addBooking({...formData})
    }
useEffect(() => {
if(isSuccess) {
  toast.success('event booked successfully....');
      navigate('/homepage');
}
if(isError) {
  toast.success('date and time unavailable...');
}
}, [navigate, isError, isSuccess]);      

 console.log(formData);
  return (
    <StyledBox>
    <Form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
    <Grid item lg={3.5} md={3} sm={2} xs={0}></Grid>
    <Grid item lg={5} md={6} sm={8} xs={12}>
    <StyledContainer>
    <Logo src={logo} alt='logo'/>
  <FormHeaderContainer>
<Heading>BOOK NOW</Heading>
</FormHeaderContainer>
<FormInnerContainer>
<Grid container spacing={2}>
<Grid item lg={12} md={12} sm={12} xs={12}>
<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose event</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='select'
          value={formData.select}
          label="Choose event"
          onChange={handleChange}
        >
          <MenuItem value='Sauna room'>Sauna room</MenuItem>
          <MenuItem value='Conference room'>Conference room</MenuItem>
          <MenuItem value='Salon'>Salon</MenuItem>
          <MenuItem value='Massage room'>Massage room</MenuItem>
          <MenuItem value='Club house'>Club house</MenuItem>
        </Select>
      </FormControl>
</Grid>
<Grid item lg={12} md={12} sm={12} xs={12}>
<TextField  fullWidth type='date' name='startDate' value={formData.startDate} onChange={handleChange} />
</Grid>
<Grid item lg={12} md={12} sm={12} xs={12}>
<TextField fullWidth type='time' name='startTime' value={formData.startTime} onChange={handleChange} />
</Grid>
<Grid item lg={12} md={12} sm={12} xs={12}>
<TextField fullWidth type='date' name='endDate' value={formData.endDate} onChange={handleChange} />
</Grid>
<Grid item lg={12} md={12} sm={12} xs={12}>
<TextField fullWidth type='time' name='endTime' value={formData.endTime} onChange={handleChange} />
</Grid>
<Grid item lg={12} md={12} sm={12} xs={12}>
<Button type='submit'>Book</Button>
</Grid>
</Grid>
</FormInnerContainer> 
</StyledContainer>
</Grid>
<Grid item lg={3.5} md={3} sm={2} xs={0}></Grid>
</Grid>
<ToastContainer />
</Form> 
</StyledBox>                 
  )
}

export default Booking