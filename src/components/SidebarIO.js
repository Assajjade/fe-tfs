import React from 'react';
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
import InfoIcon from '@mui/icons-material/Info';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import '@fontsource/nunito/400.css';
import { AccountCircle, TripOriginOutlined } from '@mui/icons-material';
import { IoEarth, IoPeople } from "react-icons/io5";


export default function SidebarIO(props) {
  
  const { drawerWidth, content } = props;
  const location = useLocation();
  const path = location.pathname;
  const [open, setOpen] = React.useState(true);

  const changeOpenStatus = () => {
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
              to="/organizer"
              selected={"/" === path}
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
                <TripOriginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Trips"} sx={{ fontFamily: 'Nunito, sans-serif' }} /> {/* Apply Nunito font */}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/trips/create"
              selected={"/trips/create" === path}
              sx={{ borderRadius: '10px', padding: '18px' }} // Add styling here
            >
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary={"Create"} sx={{ fontFamily: 'Nunito, sans-serif' }} /> {/* Apply Nunito font */}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex",  }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#65CCD0',
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={changeOpenStatus}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={changeOpenStatus}
            sx={{ mr: 2, display: { xs: "block", sm: "block" } }}
          >
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontFamily: "Nunito, sans-serif", color: "black", height:"70px",display: "flex", alignItems: "center",
    justifyContent: "center" }}>
            Organizer TFS
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            ...(open ? {} : { display: "none" }),
            backgroundColor: '#65CCD0',
          },
        }}
      >
        {myDrawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
          marginLeft: open ? `${drawerWidth}px` : "0",
          marginRight: open ? "0" : `${drawerWidth}px`, // Added marginRight
        }}
      >
        <Toolbar />
        {content}
        {/* masuk disini */}
      </Box>
    </Box>
  );
}
