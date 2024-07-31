import PoemsSection from "../components/UI/PoemsSection";

const PoemsPage = (props) =>{
    

    return(
        <PoemsSection poemData = {props.poemData}/>
    );
}

export default PoemsPage;