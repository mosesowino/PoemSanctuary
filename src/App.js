
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import legend from '../assets/images/legend.png'
// import legend from './assets/images/legend.png'

import './App.css';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import PoemsPage from './pages/PoemsPage';
import LandingPage from './pages/LandingPage';
import UserInputPage from './pages/UserInputPage';
import { useState } from 'react';
// import ContainerUsage from './components/UTILS/ContainerUsage';

let poems = [
  {title:"run", 
    poem:"joe runs all over the place,\n its cold"
  },
  {title:"Over us", poem:"amy went missing today"},
  {title:"cloud", poem:"annies kits are out"},
]

function App() {
  const[poem, setPoem] = useState(poems)

  const handleOnSentToApp = (value) =>{
    setPoem(
      (previous) => [...previous, value]
    );
    console.log(poem)
  }

  return(
    <StyledEngineProvider injectFirst>
      <div className=' min-h-screen w-screen flex flex-col mt-0 contrast-150'>
            <LandingPage/>
            <PoemsPage poemData={poem}/>
            <UserInputPage onSentToApp={handleOnSentToApp}/>
      </div>
    </StyledEngineProvider>
  )
  
}

export default App;
