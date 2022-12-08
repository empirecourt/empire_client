import React from 'react'
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { logoutUsers, selectCurrentUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const Logo = styled.img`
width: 6rem;
cursor: pointer;
@media screen and (max-width: 900px) {
 margin-right: 32%;
}
`
const LogoutBtn = styled.button`
outline: none;
border: none;
background: none;
padding: 3px 5px;
cursor: pointer;
`
function AdminNavBar() {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
    let navigate = useNavigate();
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const {user} = useAppSelector(selectCurrentUser);
console.log(user);
const dispatchLogOut = useDispatch();
      
      const handleLogout = () => {
        dispatchLogOut(logoutUsers());
        {/* @ts-ignore:next-line */}
        // logoutUser();
        navigate("/");
     
      }

  return (
    <AppBar position="static" style={{ background: '#898989'}}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <Button
              onClick={() => navigate('/event')}
              sx={{ my: 2, color: '#383838', display: 'block' }}
            >
              Event
            </Button>
          </Menu>
        </Box>
        <Logo src={logo} alt='logo' onClick={() => navigate('/homepage')}/>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
            <Button
              onClick={() => navigate('/adminPage')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              ALL Event
            </Button>
            <Button
              onClick={() => navigate('/calendar')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Calender
            </Button>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               {/* @ts-ignore:next-line */}
              <Avatar alt={user?.name.charAt(0)} src={user?.profilePicture} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))} */}
            <LogoutBtn onClick={handleLogout}>logout</LogoutBtn>
          </Menu>
        </Box>
      </Toolbar>
      <ToastContainer />
    </Container>
  </AppBar>
  )
}

export default AdminNavBar