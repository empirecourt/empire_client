import React from 'react'
import { useAppSelector } from '../app/hooks';
import { useDeleteUserMutation,useGetUsersQuery } from '../features/api/API'
import { selectCurrentUser } from '../features/userSlice';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';

const StyledBox = styled(Box)`
height: 100vh;
background-color: #313552;
padding-bottom: 10px;
`
const StyledContainer = styled.div`
margin: 0 2%;
width: auto;
@media screen and (max-width: 900px) {
  overflow-x: scroll;
  margin: 0;
}
`

const Thead = styled.thead`
width: 100%;
background-color: #9ACD32;
height: 40px;
`
const Tbody = styled.tbody`
height: 140px;
`
const Tables = styled.table`
border: 2px solid #c4c4c4;
margin-top: 0;
width: 100%;
margin-top: 20px;
border-collapse: collapse;
font-size: 0.9rem;

`
const Tr = styled.tr`

`
const Th = styled.th`
color: #fff;
margin: 0;
text-align: center;
`
const Td = styled.td`
margin: 0;
font-size: 0.9rem;
border-bottom: 2px solid #c4c4c4;
vertical-align: center;
color: #fff;
text-align: center;
`


const DeleteContainer = styled.div`
background-color: #FF6347;
padding: 5px;
border-radius: 5px;
margin-left: 5px;
cursor: pointer;
color: #fff;
font-size: 0.9rem;
`
const IconSpan = styled.span`
margin-left: 2px;
`
const StyledAvatar = styled(Avatar)`
width: 30px;
height: 30px;
background-image: url('../../images/blank_avater.jpg');
background-size: 100% 100%;
margin-left: 10%;
`
const ActionContaner = styled.div`
display: flex;
justify-content: center;
`

function Users() {
    
//   const {user} = useAppSelector(selectCurrentUser);
  {/* @ts-ignore:next-line */}
    const {data} =  useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
console.log(data)
  return (
    <StyledBox>
     <AdminNavBar />
  <StyledContainer>
    <Tables>
    <Thead>
   <Tr>
   <Th>Image</Th>
      <Th>Name</Th>
      <Th>Apartment no</Th>
      <Th>Email</Th>
      <Th>Mobile</Th>
      <Th>Action</Th>
   </Tr>
   </Thead>
   <Tbody>
     {/* @ts-ignore:next-line */}
    {data?.map((result: any) =>  ( 
   <Tr key={result._id}>
      <Td>
          {/* @ts-ignore:next-line */}
      <StyledAvatar src={result?.profilePicture} />
      </Td>
      <Td>{result?.name}</Td>
      <Td>{result?.apartmentNo}</Td>
      <Td>{result?.email}</Td>
      <Td>{result?.phone}</Td>
      <Td><ActionContaner>
          <DeleteContainer onClick={() => deleteUser(result?._id)}>
          <DeleteForeverOutlinedIcon sx={{ fontSize: 15, marginBottom: -0.3  }} />
            <IconSpan>Delete</IconSpan>
          </DeleteContainer>
         </ActionContaner></Td>
   </Tr>
   ))}
     
   </Tbody>
  </Tables>
  </StyledContainer>
  </StyledBox>
  )
}

export default Users