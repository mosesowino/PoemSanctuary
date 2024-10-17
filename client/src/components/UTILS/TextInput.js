import * as React from 'react';
// import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Card, Tooltip, CardHeader, Avatar, IconButton, poemField } from '@mui/material';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { CloudUploadOutlined } from '@mui/icons-material';
import { AttachFile } from '@mui/icons-material';
import axios from 'axios';


// const options = {
//   method : 'POST',
//   url:'http://127.0.0.1:3001/',
//   headers:{
//       // 'content-type':'application/json'
//       'content-type':'plainText'
//   },
//   data:{
//     completedInput
//   }
// };

const TextInput = (props) => {
  const[poemField, setPoemField] = React.useState('');
  const[completedInput, setCompletedInput] = React.useState(false)
  const[titleField, setTitleField] = React.useState('')
  const[titleValue, setTitleValue] = React.useState('')
  const[poemValue, setPoemValue] = React.useState('')

  
  const uploadHandler = () => {
    if(poemField.length > 0){
      props.onSubmitPoem({title:titleField,poem:poemField})
      setCompletedInput(!completedInput)
      setPoemField('')
      setPoemValue('')
      setTitleValue('')
  }
  }

  const fileAttachedHandler = () =>{
    console.log( `Attached file`)
  }

  const textAreaChangeHandler = (event) =>{
    setPoemField(event.target.value)
    setPoemValue(event.target.value)
  }

  const titleChangeHandler = (event) =>{
    setTitleField(event.target.value)
    setTitleValue(event.target.value)
  }

  React.useEffect(()=>{
    const sendToServer = async () =>{
      if(completedInput){
        try{
          await axios.post('http://localhost:3001/',{data:completedInput})
        }catch(err){
          console.log(err);
        }
      }
    }
    sendToServer()
  }, [completedInput])

  return (
    // <Textarea aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows"/>
    <Card sx={{maxWidth: 345, marginY:'auto', marginBottom:30}}>
      <input
        type='text'
        placeholder='poem title(optional)'
        className=' outline-none border-none focus:outline-none focus:border-none my-3 text-center'
        value={titleValue}
        onChange={titleChangeHandler}
        
      />
      <hr/>
      <CardContent>
        <textarea rows={20} cols={30} placeholder='create Poem' className=' border-none outline-none focus:border-none focus:outline-none text-black' value={poemValue} onChange={textAreaChangeHandler}/>
      </CardContent>
      <hr/>
      <CardActions disableSpacing className='text-blue-700'>
        <Tooltip title="upload poem">
          <IconButton onClick={uploadHandler} className='text-blue-700 cursor-pointer'>
            <CloudUploadOutlined/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Attach file instead">
          <IconButton onClick={fileAttachedHandler} className='text-blue-700 ml-auto cursor-pointer'>
            <AttachFile />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}


export default TextInput;