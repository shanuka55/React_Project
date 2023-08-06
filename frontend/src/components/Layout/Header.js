import React from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';
import {Link} from 'react-router-dom'


const Header = () => {
  return (
    <>
    <Box className="!h-20 !fixed">
      <AppBar component={'nav'} sx={{fontSize: 100}} className='!bg-slate-900 !shadow-2xl !shadow-black'>
        <Toolbar>
          <Typography className='!font-bold !text-2xl !mt-2 text-orange-400' component={'div'} sx={{flexGrow:1}}>
            <StorefrontIcon  className='!mr-2 mb-2'/>
            F O O D I E
          </Typography>
          <Box> 
            

            <ul className='!font-sans !text-lg !text-white flex space-x-12'>
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/about'}>About</Link></li>
              <li><Link to={'/items'}>Manage Items</Link></li>
              <li><Link to={'/customer'}>Manage Customer</Link></li>
              <li><Link to={'/contact'}>Contact Us</Link></li>
              <div className='flex space-x-2'>
             
              
             </div>
            </ul>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
 
   </>
  )
}

export default Header