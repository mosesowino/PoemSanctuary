import AppBarUsage from "../components/UI/AppBarUsage";
import LegendSection from "../components/UI/LegendSection";

const LandingPage = (props) =>{
    const handleSettingsItem = (value) =>{
        props.settingsItem(value)
    }
    return(
        <>
         <AppBarUsage settingsItem={handleSettingsItem}/>
         <LegendSection/>
        </>
    );
}

export default LandingPage;