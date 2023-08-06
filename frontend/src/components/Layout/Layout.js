import { Route, Routes } from 'react-router-dom';
import Header from './Header'
import Home from '../../pages/Home'
import About from '../../pages/About'
import Items from '../../pages/Items'
import Contact from '../../pages/Customer'
import PlaceOrder from '../../pages/PlaceOrder'
import SignUp from '../../pages/SignUp';
import Login from '../../pages/Login';
import Customer from '../../pages/Customer';

const Layout = () => {
  return (
    <>
       <Header /> 

  <main className='!mt-20 '>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/items' element={<Items/>}/>
    <Route path='/customer' element={<Customer/>}/>
    <Route path='/order' element={<PlaceOrder/>}/>
    <Route path='/signUp' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
  </Routes> 
  </main>
    </>
  );
};
export default Layout;