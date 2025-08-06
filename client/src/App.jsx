import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadResume from './components/UploadResume';
import Login from './components/Login';
import Register from './components/Register';
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Nav from "./components/nav";
import Applications from "./components/Applications";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (

    <BrowserRouter>
        <Nav/>

      <Routes>
        <Route>
          <Route path="/" element = {<JobList/>}/>
          <Route path="/register" element = {<Register/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/upload" element = {<UploadResume/>}/>
          <Route path="/add-job" element = {<JobForm/>}/>
          <Route path="/jobs" element = {<JobList/>}/>
          <Route path="/applications" element = {<Applications/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
