import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import { Grid } from '@mui/material';
import sauna from '../images/sauna.jpg';
import conference from '../images/conference.jpeg';
import massage from '../images/massage.jpeg';
import salon from '../images/salon.jpeg';
import club from '../images/club.jpeg';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import { useAppSelector } from '../app/hooks';
// import { selectCurrentUser } from '../features/userSlice';


//background-color: #313552;
const StyledBox = styled(Box)`
height: 100%;
background-color: #313552;
padding-bottom: 10px;
`
const StyledContainer = styled(Container)`
height: auto;
margin-top: 15px;
padding-bottom: 15px;
`
const CardContainer = styled.div`
width: 100%;
height: auto;
`
const Card = styled.div`
width: 100%;
height: 100%;
background: rgba( 255, 255, 255, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4px );
-webkit-backdrop-filter: blur( 4px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
height: 250px;
`
const CartTitle = styled.h3`
margin: 10px 0 0 10px;
color: #fff;
`
const TopCardContainer = styled.div`
height: 80%;
`
const BottomCardContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`
const SelectBtn = styled.button`
border: none;
outline: none;
cursor: pointer; 
font-size: 1rem;
margin: 10px 10px 0;
background-color: #313552;
color: #fff;
padding: 8px 10px;
border-radius: 5px;
` 
const CardImg = styled.img`
width: 100%;
height: 100%;
border-radius: 10px 10px 30px 30px;
`

function HomePage() {

 
  
   const navigate = useNavigate();
  return (
    <StyledBox>
      <NavBar />
    <StyledContainer>
    <Grid container spacing={2}>
      <Grid item lg={4} md={4} sm={6} xs={12}>
      <CardContainer>
        <Card>
          <TopCardContainer>
           <CardImg src={sauna} alt='Sauna' />
          </TopCardContainer>
          <BottomCardContainer>
          <CartTitle>Sauna room</CartTitle>
          <SelectBtn onClick={() => navigate('/booking')}>Select</SelectBtn>
          </BottomCardContainer>
        </Card>
      </CardContainer>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
      <CardContainer>
      <Card>
          <TopCardContainer>
           <CardImg src={conference} alt='Conference' />
          </TopCardContainer>
          <BottomCardContainer>
          <CartTitle>Conference room</CartTitle>
          <SelectBtn onClick={() => navigate('/booking')}>Select</SelectBtn>
          </BottomCardContainer>
        </Card>
      </CardContainer>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
      <CardContainer>
      <Card>
          <TopCardContainer>
           <CardImg src={salon} alt='Salon' />
          </TopCardContainer>
          <BottomCardContainer>
          <CartTitle>Salon</CartTitle>
          <SelectBtn onClick={() => navigate('/booking')}>Select</SelectBtn>
          </BottomCardContainer>
        </Card>
      </CardContainer>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
      <CardContainer>
      <Card>
          <TopCardContainer>
           <CardImg src={massage} alt='Massage' />
          </TopCardContainer>
          <BottomCardContainer>
          <CartTitle>Massage room</CartTitle>
          <SelectBtn onClick={() => navigate('/booking')}>Select</SelectBtn>
          </BottomCardContainer>
        </Card>
      </CardContainer>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
      <CardContainer>
      <Card>
          <TopCardContainer>
           <CardImg src={club} alt='Club' />
          </TopCardContainer>
          <BottomCardContainer>
          <CartTitle>Club house</CartTitle>
          <SelectBtn onClick={() => navigate('/booking')}>Select</SelectBtn>
          </BottomCardContainer>
        </Card>
      </CardContainer>
      </Grid>
      </Grid>
      <ToastContainer />
    </StyledContainer>
    </StyledBox>
  )
}

export default HomePage