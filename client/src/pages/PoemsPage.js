import PoemsSection from "../components/UI/PoemsSection";
import { forwardRef } from "react";

const PoemsPage = forwardRef((props, ref) =>{
    console.log("Poems page", props.poemData)
    const handleLikesAction = (value) =>{
        props.likesAction(value)
    }
    return(
        <PoemsSection poemData = {props.poemData} ref={ref} likesAction={handleLikesAction}/>
    );
})

export default PoemsPage;