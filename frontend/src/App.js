//import Layout from './components/Layout/Layout';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Items from './pages/Items'
import Contact from './pages/Customer'
import PlaceOrder from './pages/PlaceOrder'
import Header from './components/Layout/Header'
import Layout from './components/Layout/Layout'

function App() {
  return (
    <div className="App h-80">
     <Layout/> 
    </div>
  );
}

export default App;
