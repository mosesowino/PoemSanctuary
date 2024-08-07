
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import legend from '../assets/images/legend.png'
// import legend from './assets/images/legend.png'

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PoemsPage from './pages/PoemsPage';
import LandingPage from './pages/LandingPage';
import UserInputPage from './pages/UserInputPage';
import NoPage from './pages/NoPage';
import { useRef, useState } from 'react';


let poems = [
  {title:"run", 
    poem:"joe runs all over the place,\n its cold"
  },
  {title:"Over us", poem:"amy went missing today"},
  {title:"cloud", poem:"annies kits are out"},
]

const App = () => {
  const[poem, setPoem] = useState(poems);

  const handleOnSentToApp = (value) =>{
    setPoem(
      (previous) => [...previous, value]
    );
    console.log(poem)
  }



  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
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
  

  const exploreRef = useRef(null)
  const createRef = useRef(null)
  const handleExplore = (value) =>{
    if(value){
      exploreRef.current.scrollIntoView({behavior:'smooth'})
    }
  }
  const handleCreate = (value) =>{
    if(value){
      createRef.current.scrollIntoView({behavior:'smooth'})
    }
  }

  const handleMenuItemClick = (value) =>{
    const values = ["Poems","Featured","Create"];
    if(value){
      if(value === values[0]){
        handleExplore(true)
      }else if(value === values[1]){
        handleExplore(true)
      }else{
        handleCreate(true)
      }
    }
  }


  return(
    <BrowserRouter>
      <div className=' min-h-screen w-screen flex flex-col mt-0 contrast-150'>
        <Routes>

          <Route 
            path='/' 
            element={
            <>
              <LandingPage settingsItem={handleSettingsItem} explore={handleExplore} create={handleCreate} menuItemClick={handleMenuItemClick}/>
              <PoemsPage poemData={poem} ref={exploreRef}/>
              <UserInputPage onSentToApp={handleOnSentToApp} ref={createRef}/>
            </>
          } 
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
  
}

export default App;
