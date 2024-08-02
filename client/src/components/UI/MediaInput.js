import { Typography } from '@mui/material';
import TextInput from '../UTILS/TextInput';
import { useState } from 'react';


const MediaInput = (props) =>{
    const[poem, updatePoem] = useState('')
    const handleOnSubmitPoem = (value) =>{
        console.log(value)
        // updatePoem(value)
        props.onSentToInputPage(value)
    }


    return(
        <div className=' h-screen w-screen bg-primary'>
            <Typography variant='h5' className=' text-center my-4'> create </Typography>
            <TextInput onSubmitPoem={handleOnSubmitPoem}/>
        </div>
    );
}


export default MediaInput;