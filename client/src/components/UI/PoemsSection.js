import { Grid } from "@mui/material"
import PoemCard from "../UTILS/PoemCard";
import { forwardRef, useEffect, useState } from "react";
import fetchOpenAiPoems from "../../Services/ApiService";
import { Sort } from "@mui/icons-material";
import {Typography} from "@mui/material";



const PoemsSection = forwardRef((props, ref) =>{
    const[likes, setLikes] = useState(0)
    const[poems, setPoems] = useState();
    useEffect(()=>{
        const fetchAiPoems = async() =>{
        try{
                const result = await fetchOpenAiPoems()
                console.log("result is =>",result)
                setPoems(result)
            }catch(err) {
                console.error("error fetching from openai: ",err)
            }
        }
        fetchAiPoems()
    },[])
    // useEffect(()=>{
    //     console.log("likes in useeffect",likes)
    // },[likes])

    console.log("poemsection =>", poems)

    const handleLikesCount = (value) =>{
        setLikes(likes+value)
        console.log("current likes == ",likes)
    }
    const handleLikesAction = (value) =>{
        props.likesAction(value)
        console.log(value)
    }

    console.log(props.poemData);
    props.poemData.map((data)=> console.log("author",data.author))
    return(
        <Grid ref={ref} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl:3 }}  className=" w-screen min-h-screen mx-0 bg-secondary bg-gradient-to-b from-black to-blue-500">
            <Sort className="text-white mt-2 mr-auto"/>
            <Grid item xs={11} sm={12} md={12} lg={12} xl={12}  className=" mx-auto mb-2 h-screen overflow-y-scroll">
                <Typography variant="h5" className="text-center font-bold text-blue-500">Poems</Typography>
                <hr className=" w-1/2 mx-auto"/>
                <Grid container spacing={2} className=" mt-8 h-fit -z-10 ">
                    {
                        props.poemData.map((poem)=>(
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={4} style={{minHeight:"150px"}} className=" break-words">
                                <PoemCard likesCount={handleLikesCount} likesAction={handleLikesAction} poemId={poem.id}>
                                    {[poem.poemdata.title,poem.poemdata.poem,poem.poemdata.likesCount, poem.author]}
                                </PoemCard>
                            </Grid>
                        ))
                    }
               
                </Grid>
            </Grid>

        </Grid>
    )
})

export default PoemsSection