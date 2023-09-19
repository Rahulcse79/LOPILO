import './App.css';
import Frontpage from './components/Frontpage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponent from './components/privateComponent'


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<Frontpage/>}/>
    <Route element = {<PrivateComponent/>}>  
    
    
    </Route>
  
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
