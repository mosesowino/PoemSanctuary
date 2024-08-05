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
    return(
        <>
         <AppBarUsage settingsItem={handleSettingsItem} menuItemClick={handleMenuItemClick}/>
         <LegendSection create={handleCreate} explore={handleExplore}/>
        </>
    );
}

export default LandingPage;