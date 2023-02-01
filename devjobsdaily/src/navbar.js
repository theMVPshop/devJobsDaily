import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Hamburger from './hamburger.js';





const Navbar = () => {
  return ( 
    
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
 
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Menu
        </Typography>
        <button className='navbutton'>Login</button>
      </Toolbar>
    </AppBar>
  </Box>
 
        
  );
}
 
export default Navbar;