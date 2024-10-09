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
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';




const pages = ['Poems', 'Featured', 'Create'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AppBarUsage = (props) => {

  function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [authCardVisible, setAuthCardVisible] = useState(false)



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


  const handleLoginClick = () =>{
    setAuthCardVisible(!authCardVisible)
    // console.log('clicked')
  }

  const handleLoginStatus = (value) =>{
    if(value){
      setAuthCardVisible(false)
    }
  }

  return (
    <>
     <Backdrop
      sx={{zIndex:20, color:'#fff'}}
      open={authCardVisible}
      // onClick={handleLoginClick}
      />
      <HideOnScroll>
        <AppBar position="sticky" className='bg-black text-black'>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                className='logo text-blue-500'
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  // letterSpacing: '.1rem',
                  // color: 'black',
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
                      <Typography textAlign="center" onClick={handleMenuItemClick} className='text-blue-500'>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography
                className='text-blue-500'
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
                  // color: 'inherit',
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
                    <Typography textAlign="center" onClick={handleMenuItemClick} className='text-blue-500'>{page}</Typography>
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
                <Button variant="outlined" onClick={handleLoginClick}>
                  <Typography variant="p" className=' contrast-200'>sign in</Typography>
                </Button>
                </>
            

                }
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    {authCardVisible? <LoginCard isLoggedIn={handleLoginStatus}/>:''}
    </>
  );
}
export default AppBarUsage;
