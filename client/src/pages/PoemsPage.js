import PoemsSection from "../components/UI/PoemsSection";
import { forwardRef } from "react";

const PoemsPage = forwardRef((props, ref) =>{
    console.log("Poems page")
    return(
        <PoemsSection poemData = {props.poemData} ref={ref}/>
    );
})

export default PoemsPage;