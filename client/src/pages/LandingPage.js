import { useRef } from "react";
import AppBarUsage from "../components/UI/AppBarUsage";
import LegendSection from "../components/UI/LegendSection";

const LandingPage = (props) =>{
    const handleSettingsItem = (value) =>{
        props.settingsItem(value)
    }
    const handleCreate = (value) =>{
        props.create(value)
    }
    const handleExplore = (value) => {
        props.explore(value)
    }

    const handleMenuItemClick = (value) =>{
        props.menuItemClick(value);
    }

    const legendRef = useRef(null);
    const handleHomeClicked = (value) =>{
        if(value){
          legendRef.current.scrollIntoView({behavior:'smooth'})
         }
    }
    return(
        <>
         <AppBarUsage settingsItem={handleSettingsItem} menuItemClick={handleMenuItemClick} homeClicked={handleHomeClicked}/>
         <LegendSection create={handleCreate} explore={handleExplore} ref={legendRef}/>
        </>
    );
}

export default LandingPage;