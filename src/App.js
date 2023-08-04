import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import AddForm from './Components/AddForm';
import DisplayList from './Components/DisplayList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from 'react';
function App() {


  return (
    <Router>
     <Routes>
      <Route path='/' element={<AddForm/>}></Route>
      <Route path='/ItemList' element={<DisplayList />}></Route>
     </Routes>
      </Router>
  
  );
}

export default App;
