import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Login from './Login';
import AddAgent from './AddAgent';
import UploadCSV from './uploadcsv';
import AgentDashboard  from './AgentDashboard';
import AgentList  from './AgentList';



function App(){
  return (
    <BrowserRouter>
    <Routes>
      {/*<Route path="/" element={<Navigate to="/login" replace />} />*/}

      <Route path = '/register' element={<Signup/>}></Route>
      <Route path = '/login' element={<Login/>}></Route>
      <Route path='/add-agent' element={<AddAgent />} />
      <Route path="/uploadcsv" element={<UploadCSV />} />
      <Route path="/dashboard" element={<AgentDashboard />} />
      <Route path="/agents" element={<AgentList />} />


    </Routes>
    </BrowserRouter>
  )

}

export default App ;
