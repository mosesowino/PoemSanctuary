import * as React from 'react';
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
import { useState } from 'react';
import '../../App.css'
import { Backdrop } from '@mui/material';
import LoginCard from '../UTILS/LoginCard';





const pages = ['Poems', 'Featured', 'Create'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AppBarUsage = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const[loginClicked, setLoginClicked] = useState(false)

  const handleLoginClicked = () =>{
    setLoginClicked(!loginClicked);
  }
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingsItemClick = (e) =>{
    props.settingsItem(e.currentTarget.innerHTML)
  }

  const handleMenuItemClick = (e) =>{
    props.menuItemClick(e.currentTarget.innerHTML)
  }

  const handleHomeClicked = () =>{
    props.homeClicked(true)
  }


  const handleLoginStatus = (value) =>{
    if(value){
      setLoginClicked(!loginClicked)
    }
  }

  return (
    <>

    <Backdrop
      sx={{zIndex:20, color:'#fff'}}
      open={loginClicked}
      onClick={handleLoginClicked}
    />

  

    <AppBar position="sticky" className='bg-transparent text-black'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            className='logo'
            variant="h6"
            noWrap
            component="a"
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              // letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
               mixBlendMode: 'difference',
            }}
          >
            PoemSanctuary
          </Typography>

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>                  
                  <Typography textAlign="center" onClick={handleMenuItemClick}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={handleHomeClicked}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PoemSanctuary
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                <Typography textAlign="center" onClick={handleMenuItemClick}>{page}</Typography>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {
             ( localStorage.getItem('token'))?
             <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={localStorage.getItem('username').toUpperCase()} src="/static/images/avatar/2.jpg" />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={handleSettingsItemClick}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
             </>:
             <>
             <Button variant="outlined" onClick={handleLoginClicked}>
               <Typography variant="p" className=' contrast-200'>sign in</Typography>
             </Button>
             </>
         

            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    {loginClicked? <LoginCard loginStatus={handleLoginStatus}/>:''}
    </>
  );
}
export default AppBarUsage;
