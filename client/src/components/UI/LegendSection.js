import '@fontsource/roboto'

// import Card from "../UTILS/Card"
import fetchOpenAiPoems from '../../Services/ApiService'
// import axios from 'axios'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'
import Card from '../UTILS/Card'
import { useEffect, useState } from 'react'
import { ArrowForward } from '@mui/icons-material'

// const dataApi = 'http://localhost:3001/'
const LegendSection = (props) => {

    const[data, setData] = useState();
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
                setData(...data,
                    result
                )
                setData(result);
            }catch(err){
                setError(err);
            }
        };
        getPoem()
    },[]
);

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
        <Box className=" min-h-screen w-screen relative flex justify-center bg-primary z-10 -mt-20">
                <Card className= 'h-auto w-auto absolute left-0 bottom-0 leading-relaxed p-1'>
                    <Typography variant="h5"  className=' font-bold text-secondary text-5xl'>
                        Inspiring<br/> Minds,<br/> One Poem<br/> At<br/> A <br/>Time
                    </Typography>
                </Card>

                <div className=' flex self-center'>
                    <Button variant="outlined" className='mx-1 ' onClick={handleCreateClick}>
                        Create
                        <ArrowForward/>
                    </Button>
                    <Button variant="contained" className='mx-1' onClick={handleExploreClick}>
                        Explore
                    </Button>
                    <div>{}</div>
                    {/* <div>{error}</div> */}
                </div>
        </Box>
    )
}

export default LegendSection