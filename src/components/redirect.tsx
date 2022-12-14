import { current } from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


function Redirect() {

    const [count, setCount] = useState(5)
    const navigate = useNavigate();

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((currentCount) => currentCount -1)
      }, 1000)  

      count === 0 && navigate('/')
      return () => clearInterval(interval);
    }, [count, navigate]);

  return (
    <Box sx={{height: '100vh', width: '100vw'}}>
        <Container sx={{ height: '100vh', width: '100vw', display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '2rem', fontWeight: 800, color: '#008080'}}>Redirecting you in {count} sec.</Typography>
        </Container>
    </Box>
  )
}

export default Redirect