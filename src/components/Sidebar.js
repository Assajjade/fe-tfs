import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { AccountCircle } from '@mui/icons-material';
import { IoEarth, IoPeople } from 'react-icons/io5';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function Sidebar(props) {
  const { drawerWidth, content } = props;
  const location = useLocation();
  const path = location.pathname;
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const myDrawer = (
    <div>
      <Toolbar />
      <Box  sx={{ overflow: "auto", padding:"20px" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin"
              selected={"/admin" === path}
              sx={{ borderRadius: '10px', padding: '18px' }} 
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} sx={{ fontFamily: 'Nunito, sans-serif' }} /> {/* Apply Nunito font */}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/trips"
              selected={"/trips" === path}
              sx={{ borderRadius: '10px', padding: '18px' }} // Add styling here
            >
              <ListItemIcon>
                <LocalAirportIcon />
              </ListItemIcon>
              <ListItemText primary={"Trips"} sx={{ fontFamily: 'Nunito, sans-serif' }} /> {/* Apply Nunito font */}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/blogs"
              selected={"/blogs" === path}
              sx={{ borderRadius: '10px', padding: '18px' }} // Add styling here
            >
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary={"Blogs"} sx={{ fontFamily: 'Nunito, sans-serif' }} /> {/* Apply Nunito font */}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/merchandise"
            selected={"/merchandise" === path}
            sx={{ borderRadius: '10px', padding: '18px' }} // Add styling here
          >
            <ListItemIcon>
              <LocalGroceryStoreIcon />
            </ListItemIcon>
            <ListItemText primary={"Merchandise"} sx={{ fontFamily: 'Nunito, sans-serif' }} /> {/* Apply Nunito font */}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="/crowdfunding"
          selected={"/crowdfunding" === path}
          sx={{ borderRadius: '10px', padding: '18px' }} // Add styling here
        >
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary={"Crowdfunding"} sx={{ fontFamily: 'Nunito, sans-serif' }} /> {/* Apply Nunito font */}
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to="/manage-access"
        selected={"/manage-access" === path}
        sx={{ borderRadius: '10px', padding: '18px' }} // Add styling here
      >
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary={"Manage Access"} sx={{ fontFamily: 'Nunito, sans-serif' }} /> {/* Apply Nunito font */}
      </ListItemButton>
    </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#65CCD0',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon style={{ color: 'black' }} />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { xs: 'block', sm: 'block' } }}
          >
            <MenuIcon style={{ color: 'black' }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontFamily: 'Nunito, sans-serif',
              color: 'black',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Organizer TFS
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#65CCD0',
          },
        }}
      >
        {myDrawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
      {open && <div onClick={toggleDrawer} style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1200 }} />}
    </Box>
  );
}
