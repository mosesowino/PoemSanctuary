import { Typography } from '@mui/material';
import TextInput from '../UTILS/TextInput';
import { forwardRef } from 'react';

const MediaInput = forwardRef((props,ref) =>{
    const handleOnSubmitPoem = (value) =>{
        props.onSentToInputPage(value)
        console.log(value)
    }


    return(
        <div ref={ref} className=' min-h-screen w-screen bg-gradient-to-t from-black via-black to-blue-500 grid-cols-1 md:grid-cols-1 sm:grid-cols-1'>
            <div className='ml-4 text-white font-extrabold text-6xl '>
                {/* <div className='mr-0'> */}
                 <img src='/images/write.png' alt='write' className='mr-0 sm:w-full h-auto md:w-auto'/>
                {/* </div> */}
                <h2 className='text-blue-500'>Write</h2>
                <h2>and</h2>
                <h2 className=' text-blue-500'>share</h2>
                <h2>your poems</h2>
                {/* <Typography variant='h1'>Write Your Own Poem and Share</Typography> */}
            </div>
            <div>
                <Typography variant='h5' className=' text-center my-4'> create </Typography>
                <TextInput onSubmitPoem={handleOnSubmitPoem}/>
            </div>
        </div>
    );
})


export default MediaInput;