import { WarningRounded } from "@mui/icons-material";

const NoPage = () =>{
    return(
        <div className="h-screen w-screen flex">
            <div className="self-center mx-auto text-center">
                <WarningRounded className="justify-center"/>
                <h4>No page found</h4>
            </div>
        </div>
    )
}

export default NoPage;