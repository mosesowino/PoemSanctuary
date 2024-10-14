import '@fontsource/roboto'

import fetchOpenAiPoems from '../../Services/ApiService'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'
import Card from '../UTILS/Card'
import { forwardRef, useEffect, useState } from 'react'
import { ArrowForward } from '@mui/icons-material'
import '../../App.css'

// const dataApi = 'http://localhost:3001/'

const LegendSection = forwardRef((props,ref) => {
    const[aiData, setAiData] = useState();
    const[error, setError] =useState(null);

    // const handleExploreClick = () => {
    //     fetch('127.0.0.1:3002/')
    //     .then(console.log())
    //     .catch("Error")
    // }

    // useEffect(()=>{
    //     const fetchData = async () =>{
    //     try{
    //         const response = await axios.get(dataApi)
    //         setData(response.data)
    //         console.log(response.data)
    //     }catch(error){
    //         console.log(`error ---> ${error}`)
    //         setError(error)
    //     }
    //  }
    //  fetchData();

    // }, []
    // )
    useEffect(()=>{
        const getPoem = async () =>{
            try{
                const result = await fetchOpenAiPoems();
                setAiData(result)
            }catch(err){
                setError(err);
            }
        };
        getPoem()
    },[]
);

    console.log("ai data ==>",aiData)
    const handleExploreClick = () =>{
        props.explore(true)
        props.create(false)
    }
    const handleCreateClick = () =>{
        props.create(true)
        props.explore(false)
    }

if(error)<div>Error-----{error.message}</div>

    return(
        <Box ref={ref} className=" min-h-screen w-screen relative flex justify-center z-10" id='legendImage'>
                {/* <Card className= 'h-auto w-auto absolute left-0 bottom-0 leading-relaxed p-1 top-10 right-10'>
                    <Typography variant="h5"  className=' font-bold text-secondary text-5xl'>
                        Inspiring<br/> Minds<br/> One Poem<br/> At<br/> A <br/>Time
                        Inspiring Minds<br/> One Poem<br/> At A Time
                    </Typography>
                </Card> */}

                <div className=' flex self-center flex-col space-y-5 h-auto w-auto absolute left-0 bottom-0 leading-relaxed p-1 top-10 right-10'>
                    <Typography variant="h5"  className=' font-bold text-5xl block text-white'>
                        Inspiring Minds<br/> One Poem<br/> At A Time
                    </Typography>
                    <div className='flex-row'>
                    <Button variant="contained" className='mx-1' onClick={handleExploreClick}>
                        Explore
                    </Button>
                    <Button variant="outlined" className='mx-1 text-white' onClick={handleCreateClick}>
                        Create
                        <ArrowForward/>
                    </Button>
                    </div>
                </div>
        </Box>
    )
})

export default LegendSection