
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import legend from '../assets/images/legend.png'
// import legend from './assets/images/legend.png'

import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import PoemsPage from './pages/PoemsPage';
import LandingPage from './pages/LandingPage';
import UserInputPage from './pages/UserInputPage';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import { useState } from 'react';


let poems = [
  {title:"run", 
    poem:"joe runs all over the place,\n its cold"
  },
  {title:"Over us", poem:"amy went missing today"},
  {title:"cloud", poem:"annies kits are out"},
]

const App = () => {
  // useScrollToTop();
  const[poem, setPoem] = useState(poems);
  const[isAuthenticated, setIsAuthenticated] = useState(false);

  
  const handleOnSentToApp = (value) =>{
    setPoem(
      (previous) => [...previous, value]
    );
    console.log(poem)
  }

  const handleAuth = (value) => {
    setIsAuthenticated(value)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(!isAuthenticated)
  }


  const handleDashboard = () =>{
    console.log("on dashboard")
  }

  const handleAccount = () =>{
    console.log("In account")
  }

  const handleProfile = () =>{
    console.log("In profile")
  }


  const handleSettingsItem = (value) =>{
    console.log("settings value =>",value)
    if(value === 'Logout'){
      handleLogout();
    }else if(value === 'Dashboard'){
      handleDashboard()
    }else if(value === 'Account'){
      handleAccount()
    }else{
      handleProfile()
    }
  }

  return(
    <BrowserRouter>
      <div className=' min-h-screen w-screen flex flex-col mt-0 contrast-150'>
        <Routes>
          <Route 
           path='/login'
           element={isAuthenticated?<Navigate to="/" replace/>:<Login setAuth={handleAuth}/>}
           />
          <Route path='/' element={isAuthenticated ? <LandingPage settingsItem={handleSettingsItem}/>:<Navigate to="/login" replace/>} />
          <Route path='/poems' element={<PoemsPage poemData={poem}/>}/>
          <Route path='/input' element={<UserInputPage onSentToApp={handleOnSentToApp}/>}/>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
  
}

export default App;
