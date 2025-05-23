
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PoemsPage from './pages/PoemsPage';
import LandingPage from './pages/LandingPage';
import UserInputPage from './pages/UserInputPage';
import NoPage from './pages/NoPage';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

// const poem = [
//   {title:'Suns', author:'author1', poem:dummy, likesCount:'5'},
//   {title:'Wilbur', author:'author2', poem:dummy, likesCount:'44'},
//   {title:'Memories', author:'Billy', poem:dummy, likesCount:'250'},
// ]
const App = () => {
  const [isTouched, setIsTouched] = useState(false);
  const[poem, setPoem] = useState([]);
  const[currentPoem, setCurrentPoem] = useState();
  const[likes, setLikes] = useState();
  
  useEffect(()=>{
    const fetchServerPoems = async() =>{
      try{
        const result = await axios.get(`${backendUrl}/servePoemData`);
        let fetchedPoems = await result.data.results;
        let newArr = []
        console.log("results ==>",result.data.results)
        fetchedPoems.map((poem)=>{
          return newArr.push(poem)
        })
        console.log(newArr);
        setPoem((prev)=>
          // [...prev, ...newArr]
        [...prev, ...fetchedPoems]
        )
        newArr = [];
      }catch(err){
        console.error("Error fetching poems from database ===>",err);
      }
    }
    fetchServerPoems();
  },[currentPoem])

  const handleOnSentToApp = (value) =>{
    console.log("value ===", value)
    setCurrentPoem(value)//which we're sending server
    // setPoem(//all available poems to be displayed
    //   (previous) => [...previous, value]
    // );
    console.log("poem ===",poem)  
    
  }

  useEffect(()=>{
    const sendPoemToServer = async () =>{
      try{
        console.log("current poem === >" , currentPoem)
        currentPoem.author = localStorage.getItem("username");
        currentPoem.likesCount =  0;
        const response = await axios.post(`${backendUrl}/poems`,currentPoem,{
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

  useEffect(()=>{
    const updateLikes = async () =>{
      try{
        console.log("likes in try ",likes)
        const response = await axios.post(`${backendUrl}/updateLikes`,likes,{
          headers:{
            'Content-Type': 'application/json'
          }
        }
        )
        console.log("Like updation response ", response)
      }catch(err){
        console.error("Error updating likes", err)
      }
    }
    updateLikes()
  },[likes])

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


  const handleLikesAction = (value) =>{
    console.log(value);
    setLikes(value)
    
  }

  const handleTouchStart = () => setIsTouched(true);
  const handleTouchEnd = () => setIsTouched(false);

  const handleScroll = () => setIsTouched(true);
  const handleScrollEnd = () => setIsTouched(false);

  // Clean up after scrolling stops
  useEffect(() => {
    let timer;
    if (isTouched) {
      timer = setTimeout(() => setIsTouched(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isTouched]);

  let solid_color = 'black';
  return(
    <BrowserRouter>
      <div
       className={`min-h-screen w-screen contrast-200 mt-0 transition-all duration-500 overflow-y-auto bg-${solid_color}`}
      >
        <Routes>

          <Route 
            path='/' 
            element={
            <>
              <LandingPage settingsItem={handleSettingsItem} explore={handleExplore} create={handleCreate} menuItemClick={handleMenuItemClick}/>
              <PoemsPage poemData={poem} ref={exploreRef} likesAction={handleLikesAction}/>
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
