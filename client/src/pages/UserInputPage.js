import { forwardRef } from "react";
import MediaInput from "../components/UI/MediaInput";

const UserInputPage = forwardRef((props,ref) =>{

  const handleSentToInputPage = (value) =>{
    console.log(value)
    props.onSentToApp(value)
  }

  return(
  <>
    <MediaInput onSentToInputPage={handleSentToInputPage} ref={ref}/>
  </>
  );
})

export default UserInputPage;