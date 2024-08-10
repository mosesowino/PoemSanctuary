import { Typography } from '@mui/material';
import TextInput from '../UTILS/TextInput';
import { forwardRef } from 'react';

const MediaInput = forwardRef((props,ref) =>{
    const handleOnSubmitPoem = (value) =>{
        props.onSentToInputPage(value)
        console.log(value)
    }


    return(
        <div ref={ref} className=' h-screen w-screen bg-primary'>
            <Typography variant='h5' className=' text-center my-4'> create </Typography>
            <TextInput onSubmitPoem={handleOnSubmitPoem}/>
        </div>
    );
})


export default MediaInput;