import { Grid, Typography } from "@mui/material"
import PoemCard from "../UTILS/PoemCard";
import Card from "../UTILS/Card";
import { forwardRef, useEffect, useState } from "react";
import fetchOpenAiPoems from "../../Services/ApiService";
import HalfRating from "../UTILS/Rating";


const PoemsSection = forwardRef((props, ref) =>{
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

    console.log("poemsection =>", poems)


    console.log(poems);
    return(
        <Grid ref={ref} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl:3 }}  className=" w-screen min-h-screen mx-0 bg-secondary">
            <Grid item xs={11} sm={7} md={8} lg={9} xl={8}  className=" mx-auto mb-2 h-screen overflow-y-scroll">
                <Typography variant="h5"  className="text-center font-bold">Poems</Typography>
                <Grid container spacing={2} className=" mt-8 h-fit -z-10">
                    {
                        props.poemData.map((poem)=>(
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={4} style={{minHeight:"150px"}}>
                                <PoemCard>
                                    {[poem.title,poem.poem]}
                                </PoemCard>
                                {/* poem{ poem} */}
                            </Grid>
                        ))
                    }
               
                </Grid>
            </Grid>

            <Grid item xs={11} sm={4} md={3} lg={2} xl={3}  className=" w-auto p-1 mx-auto h-fit mt-8 border-2 border-lg bg-red-200 rounded-md">
                <Typography variant="h5" color="white" className="Block mb-2 text-center font-bold ">Leaderboard</Typography>
                {props.poemData.map((poem) => (
                    <Card className="p-2 my-3 m-2 rounded-md text-black font-bold bg-white flex justify-between">
                        <Typography variant="p">{poem.title}</Typography>
                        <HalfRating/>
                    </Card>
                ))}
            </Grid>

        </Grid>
    )
})

export default PoemsSection