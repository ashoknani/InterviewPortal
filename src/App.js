import {Routes,Route} from "react-router-dom";
import React from 'react';
import Homepage from './component/Homepage'
import Test from './component/Test'
import Finish from './component/Finish'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="container mt-4 mb-2">My Interview Portal</h1>

      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/:id/:qid" element={<Test/>} />
        <Route path="/finish" element={<Finish/>} />
      </Routes>
      
    </div>
  );
}

export default App;
