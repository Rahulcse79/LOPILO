import './App.css';
import LOPILO from './components/LOPILO';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import ShopkeeperProfile from './components/Shopkeeper Files/ShopkeeperProfile';
import ShopkeeperSecurityPage from './components/Shopkeeper Files/ShopkeeperSecurityPage';
import HelpCenter from './components/HelpCenter';
import ChangePassword from './components/Users Files/ChangePassword';
import Userprofile from './components/Users Files/UserProfile';

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
    <Route path="/userprofile" element={<Userprofile/>}/>
    <Route path="/Shopkeeper" element={<Shopkeeper/>}/>
    <Route path="/Shopkeeperlogin" element={<Shopkeeperlogin/>}/>
    <Route path="/Shopkeepersignup" element={<Shopkeepersignup/>}/>
    <Route path="/Shopkeeper-forgot-password" element={<ShopkeeperForgot/>}/>
    <Route path="/Shopkeeper-forgot-security-code" element={<ShopkeeperForgotSecurity/>}/>
    <Route path="/shopkeeperprofile" element={<ShopkeeperProfile/>}/>
    <Route path="/Shopkeeper-security-page" element={<ShopkeeperSecurityPage/>}/>
    <Route path="/HelpCenter" element={<HelpCenter/>}/>
  
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
