import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import CheckLogsByRatio from './Components/CheckLogsByRatio';
import CheckLogs from './Components/CheckLogs';

function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<CheckLogs/>}></Route>
    <Route path='/checklogs' element={<CheckLogsByRatio/>}></Route>

  </Routes>
  </BrowserRouter>
  
  </>
  );
}

export default App;
