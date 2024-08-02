import MediaInput from "../components/UI/MediaInput";

const UserInputPage = (props) =>{

  const handleSentToInputPage = (value) =>{
    console.log(value)
    props.onSentToApp(value)
  }

  return(
  <>
    <MediaInput onSentToInputPage={handleSentToInputPage}/>
  </>
  );
}

export default UserInputPage;