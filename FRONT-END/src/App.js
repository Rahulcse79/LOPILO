import './App.css';
import LOPILO from './components/LOPILO';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponent from './components/privateComponent'
import Login from './components/Users Files/Login'
import Signup from './components/Users Files/Signup'
import Home from './components/Home'
import About from './components/About'
import Photos from './components/Photos'
import ForgotPage from './components/Users Files/Forgot'
import Shopkeeper from './components/Shopkeeper';
import Shopkeeperlogin from './components/Shopkeeper Files/Shopkeeperlogin';
import Shopkeepersignup from './components/Shopkeeper Files/Shopkeepersignup';
import ShopkeeperForgot from './components/Shopkeeper Files/ShopkeeperForgotPassword';
import ShopkeeperForgotSecurity from './components/Shopkeeper Files/ShopkeeperForgotSecurity';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    
    <Route path="/" element={<LOPILO/>}/>
    <Route path="/Home" element={<Home/>}/>
    <Route path="/About" element={<About/>}/>
    <Route path="/Photos" element={<Photos/>}/>
    <Route path="/Log-in" element={<Login/>}/>
    <Route path="/Sign-up" element={<Signup/>}/>
    <Route path="/Forgot" element={<ForgotPage/>}/>
    <Route path="/Shopkeeper" element={<Shopkeeper/>}/>
    <Route path="/Shopkeeperlogin" element={<Shopkeeperlogin/>}/>
    <Route path="/Shopkeepersignup" element={<Shopkeepersignup/>}/>
    <Route path="/Shopkeeper-forgot-password" element={<ShopkeeperForgot/>}/>
    <Route path="/Shopkeeper-forgot-security-code" element={<ShopkeeperForgotSecurity/>}/>

    <Route element = {<PrivateComponent/>}>  
  
    </Route>
  
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
