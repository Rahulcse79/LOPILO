import './App.css';
import Frontpage from './components/Frontpage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponent from './components/privateComponent'
import Login from './components/Login'
import Signup from './components/Signup'
import Addstore from './components/Addstore'
import Home from './components/Home'
import About from './components/About'
import Photos from './components/Photos'
import ForgotPage from './components/Forgot'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    
    <Route path="/" element={<Frontpage/>}/>
    <Route path="/Home" element={<Home/>}/>
    <Route path="/About" element={<About/>}/>
    <Route path="/Photos" element={<Photos/>}/>
    <Route path="/Add-store" element={<Addstore/>}/>
    <Route path="/Log-in" element={<Login/>}/>
    <Route path="/Sign-up" element={<Signup/>}/>
    <Route path="/Forgot" element={<ForgotPage/>}/>

    <Route element = {<PrivateComponent/>}>  
  
    </Route>
  
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
