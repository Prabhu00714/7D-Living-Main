// Home.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ListIcon from '@mui/icons-material/List';
import Header from "./LogInOut/Header";
import Welcome from "./HomeComponent/Welcome";
import QuestionList from "./QuestionList ";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  ...theme.mixins.toolbar,
  padding: theme.spacing(2),
}));

const DrawerFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  flexGrow: 1,  // Added to push the content to the bottom
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#fff', // Set background color to white
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Home = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('QuestionForm');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    setOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ marginLeft: open ? drawerWidth : 0 }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/Logo.png`}
                alt="Logo"
                style={{
                  width: '40px', // Adjust as needed
                  height: 'auto',
                  marginRight: '10px', // Adjust as needed
                }}
              />
              Mini variant drawer
              <Header />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <img
              src={`${process.env.PUBLIC_URL}/images/Logo.png`}
              alt="Logo"
              style={{
                width: '35%', // Adjust as needed
                height: 'auto',
                objectFit: 'fit',
              }}
            />
            <Typography variant="h8" sx={{ fontFamily: 'stencil', fontStyle: 'italic', fontWeight: 'bold', color: 'yourColor' }}>
              7D Living
            </Typography>
          </DrawerHeader>
          <Divider sx={{ mt: -1 }} />
          <List>
            <ListItemButton
              onClick={() => handleComponentChange('QuestionForm')}
              selected={selectedComponent === 'QuestionForm'}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: selectedComponent === 'QuestionForm' ? theme.palette.action.hover : 'inherit',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary="Question Form" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

            <ListItemButton
              onClick={() => handleComponentChange('QuestionList')}
              selected={selectedComponent === 'QuestionList'}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: selectedComponent === 'QuestionList' ? theme.palette.action.selected : 'inherit',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Question List" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </List>
          <DrawerFooter>
           {open ? (
              <IconButton onClick={handleDrawerClose} sx={{ width: drawerWidth }}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            ) : (
              <IconButton onClick={handleDrawerOpen} sx={{ width: drawerWidth }}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            )}
          </DrawerFooter>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <img
            className="background-image"
            src={`${process.env.PUBLIC_URL}/images/background.jpg`}
            alt="Background"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          />
          <div>
            {selectedComponent === 'QuestionForm' && <Welcome />}
            {selectedComponent === 'QuestionList' && <QuestionList />}
          </div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Home;
