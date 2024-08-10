
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
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';


let poems = [
  {title:"run", 
    poem:"joe runs all over the place,\n its cold"
  },
  {title:"Over us", poem:"amy went missing today"},
  {title:"cloud", poem:"annies kits are out"},
]


const App = () => {
  const[poem, setPoem] = useState(poems);
  const[currentPoem, setCurrentPoem] = useState();
  
  useEffect(()=>{
    const fetchDatabasePoems = async() =>{
      try{
        const result = await axios.get("http://localhost:3001/servePoemData");
        console.log("original poem from db ===>",result.data)
      }catch(err){
        console.error("Error fetching poems from database",err);
      }
    }
    fetchDatabasePoems();
  },[])
  const handleOnSentToApp = (value) =>{
    setCurrentPoem(value)
    setPoem(
      (previous) => [...previous, value]
    );
    console.log(poem)    
  }

  //send poem to server
  useEffect(()=>{
    const sendPoemToServer = async () =>{
      try{
        currentPoem.author = localStorage.getItem("username");
        const response = await axios.post("http://localhost:3001/poems",currentPoem,{
          headers:{
            'Content-Type': 'application/json'
          }
        });
        console.log("Server response:", response.data);
      }catch(err){
        console.error("Error sending data to server ", err)
      }
    }
    sendPoemToServer();
  },[currentPoem])


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

  //fetch poems from database
  

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
