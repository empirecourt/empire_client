import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/logo.png';
import { useSigninUserMutation, useSignupUserMutation } from '../features/api/API';
import { setUsers } from '../features/userSlice';
import { useAppDispatch} from '../app/hooks';


const StyledBox = styled(Box)`
background-color: #313552;
margin: 0;
padding: 0;
height: 100%;
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
const AgentInfo = styled.p`
color: #494949;
 border-bottom: 0.5px solid #C4C4C4;;
`
const AgentImgContainer = styled.div`
width: 100px;
height: 100px;
border: 0.5px solid #C4C4C4;
display: flex;
border-radius: 10px;
justify-content: center;
align-items: center;
flex-direction: column;
background-image: url('../images/blank_avater.jpg');
background-size: 100% 100%;
`
const AgentImage = styled.img`
width: 100%;
height: 100%;
`
 const AgentImgLabel = styled.label`
 color: #9ACD32;
 cursor: pointer;
 font-size: 1rem;
 text-align: center;
 width: 100%;
 height: 100%;
 display: flex;
align-items: center;
justify-content: center;
font-weight: 700;
 `
 const Form = styled.form`
 display: flex;
 align-items: center;
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
const UploadBtn = styled(Button)`
width: 102px;
height: auto;
margin: 5px 0;
padding-top: 2px;
padding-bottom: 2px;
font-size: 0.8rem;     
`
const SwitchBtn = styled.button`
border: none;
outline: none;
cursor: pointer; 
background: inherit;
display: flex;
margin-top: 18px;
color: #1E90FF;
`
const Logo = styled.img`
width: 80px; 
height: 80px;
border-radius: 20px;
`

function Login() {

    const [isRegister, setIsRegister] = useState(true)
    const [agent, setAgent] = useState({firstName: '', lastName: '', email: '', password: '', phone: '', confirmPassword: '', apartmentNo: '', profilePicture: ''});
    const [image, setImage] = useState('')
    const  [ signupUser, {isSuccess: signupIsSuccess}] = useSignupUserMutation();
    const [ signinUser, { data, isSuccess: signinIsSuccess}] = useSigninUserMutation();
   const handleChange = (e: any) => {
  //  const name = e.target.name;
  //  const value = e.target.value;
   setAgent(({...agent, [e.target.name]: e.target.value}))
   }
   const dispatch = useAppDispatch();
              
console.log(agent);
let navigate = useNavigate();
  
   const handleUpload = async () => {
    
   for ( const file of image) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'userImg');
   await fetch('https://api.cloudinary.com/v1_1/dykaaqfrm/image/upload', {
    method: 'POST',
    body: formData,
    // CLOUDINARY_URL=cloudinary://457848644697916:vOAQU-f0WzlGGBwlxAB9VEaRin4@dykaaqfrm
  })
  .then(r => r.json())
  .then(data => {
    setAgent({...agent, profilePicture: data.secure_url});
      if (data.url) {
        toast.success('Uploaded successfully....')
       } 
      })
      };
  
   }
    const handleSubmit = async (e: any) => { 
      e.preventDefault()
      if(isRegister === false) {
        signupUser({...agent});
      } else {
        signinUser({...agent});
      }
    }
    console.log(data);
useEffect(() => { 
  if(signinIsSuccess) {
     dispatch(setUsers({ user: data?.data, token: data?.token , refreshToken: data?.refreshToken}));
     toast.success('signin successfully....')
      navigate('/homepage');
  }
  if(signupIsSuccess) {
    toast.success('signup successfully....');
    navigate('/');
    setIsRegister(true);
  }
}, [signinIsSuccess, signupIsSuccess, data?.data, data?.token, data?.refreshToken, dispatch, navigate])


 
  return (
    <StyledBox style={{ height: isRegister? '100vh': '100%'}}>
        <Form onSubmit={handleSubmit} >
        {isRegister ? 
        <>
        <Grid container>
           <Grid item lg={4} md={4} sm={3} xs={1}></Grid>
            <Grid item lg={4} md={4} sm={6} xs={10}>
                <StyledContainer>
                    <Logo src={logo} alt='logo'/>
                <FormHeaderContainer>
    <Heading>USER LOGIN</Heading>
    </FormHeaderContainer>
    
    <FormInnerContainer>
    <Grid container>
    
    <Grid item lg={12} md={12} sm={12} xs={12}>
    <StyledTextField id="outlined-basic" type='email' label='Email' size='small' name='email' value={agent.email} onChange={handleChange} autoComplete="off" />
    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12}>
    <StyledTextField id="outlined-basic" type='password' label='Password' size='small' name='password' value={agent.password} onChange={handleChange} autoComplete="off" />
    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12}>
        <SwitchBtn style={{marginLeft: 0}} onClick={() => setIsRegister(false)}>not registered ?</SwitchBtn>
    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12}>
    <Button type='submit'>Login</Button>
    </Grid>
    </Grid>
    </FormInnerContainer>    
   
                </StyledContainer>
            </Grid>
            <Grid item lg={4} md={4} sm={3} xs={1}></Grid>
            </Grid>
        </> 
        
        :
        <Grid container>
           <Grid item lg={3} md={3} sm={2} xs={1}></Grid>
            <Grid item lg={6} md={6} sm={8} xs={10}>
    <StyledContainer> 
      <Grid container>
      <Grid item lg={3} md={3} sm={2} xs={1}>


      </Grid>
      </Grid>
    <Logo src={logo} alt='logo'/>      
    <FormHeaderContainer>
    <Heading>NEW USER</Heading>
    </FormHeaderContainer>
    <AgentInfo>User Information</AgentInfo>
    <AgentImgContainer>
   {agent.profilePicture ?
   <AgentImage src={agent.profilePicture} />
    :
    <>
    <ImgInput name='profilePicture' 
    id='img' type='file' accept='image/png, image/jpg, image/jpeg, image/webp' 
    onChange={(e: any) => setImage(e.target.files)}/>
    <AgentImgLabel htmlFor='img'>Pick image</AgentImgLabel>
    </>
    }
    </AgentImgContainer>
     <UploadBtn type='button' onClick={handleUpload}>Upload</UploadBtn>
    <FormInnerContainer>
    <Grid container>
    <Grid item lg={6} md={6} sm={6} xs={12}>
    <StyledTextField id="outlined-basic" type='text' label='First Name' size='small' name='firstName' value={agent.firstName} onChange={handleChange} />
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={12}>
    <StyledTextField id="outlined-basic" type='text' label='Last Name' size='small' name='lastName' value={agent.lastName} onChange={handleChange} />
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={12}>
    <StyledTextField id="outlined-basic" type='email' label='Email' size='small' name='email' value={agent.email} onChange={handleChange} autoComplete="off" />
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={12}>
    <StyledTextField id="outlined-basic" type='password' label='Password' size='small' name='password' value={agent.password} onChange={handleChange} autoComplete="off" />
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={12}>
    <StyledTextField id="outlined-basic" type='password' label='confirmPassword' size='small' name='confirmPassword' value={agent.confirmPassword} onChange={handleChange} />
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={12}>
    <StyledTextField id="outlined-basic" type='number' label='Phone' size='small' name='phone' value={agent.phone} onChange={handleChange} />
    </Grid>
     <Grid item lg={6} md={6} sm={6} xs={12}>
    <StyledTextField id="outlined-basic" type='text' label='Apartment No' size='small' name='apartmentNo' value={agent.apartmentNo} onChange={handleChange} />
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={12}></Grid>
    {/*<Grid item lg={6} md={6} sm={6} xs={12}>
    <StyledTextField id="outlined-basic" type='text' label='Role' size='small' name='role' value={agent.role} onChange={handleChange} />
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={12}>
    <StyledTextField id="outlined-basic" type='text' label='Location' size='small' name='location' value={agent.location} onChange={handleChange} />
    </Grid> */}
    <Grid item lg={6} md={6} sm={6} xs={12}>
        <SwitchBtn onClick={() => setIsRegister(true)}>already registered ?</SwitchBtn>
    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12}>
    <Button type='submit'>Register</Button>
    </Grid>
    </Grid>
    </FormInnerContainer> 
    <ToastContainer />   
    </StyledContainer>
    <Grid item lg={3} md={3} sm={2} xs={1}></Grid>
    </Grid>  
    </Grid>
  }   
  </Form>  
    </StyledBox>
  )
}

export default Login


