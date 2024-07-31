import { Grid, Typography } from "@mui/material"
import PoemCard from "../UTILS/PoemCard";
import Card from "../UTILS/Card";


const PoemsSection = (props) =>{


    console.log(`In PoemsSection ${props.poemData[0].title}`)
    return(
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl:3 }} sx={{backgroundColor:'#101820',}} className=" w-screen h-screen mx-0 bg-secondary overflow-y-scroll">
            <Grid item xs={11} sm={7} md={7} lg={8} xl={8}  className=" rounded-xl mx-auto mb-2">
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

            <Grid item xs={11} sm={4} md={4} lg={3} xl={3}  className=" w-auto p-1 mx-auto h-fit mt-8 shadow-md blur-sm rounded-md shadow-white">
                <Typography variant="h5" color="white" className="Block mb-2 text-center font-bold ">Leaderboard</Typography>
                {props.poemData.map((poem) => (
                    <Card className="p-2 my-3 m-2 rounded-md text-black font-bold bg-white shadow-md shadow-black">
                        {poem.title}
                    </Card>
                ))}
            </Grid>

        </Grid>
    )
}

export default PoemsSection