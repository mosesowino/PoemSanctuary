import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { Backdrop } from '@mui/material';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// const socket = io('http://localhost:3002/')




const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PoemCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [favorited, setFavorited] = useState(false);
  // const[likesCount, setLikesCount] = useState(props.children[2])
  const[likesCount, setLikesCount] = useState()
  
  let poemId = props.poemId;

  // useEffect(()=>{
  //   socket.on(`liked`,(likes)=>{
  //     console.log("likes again==>",likes)
  //     setLikesCount(likes)
  //   });
  // },[favorited])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    // let poemId =props.poemId    
    if(favorited){
      setFavorited(false);
      // setLikesCount(likesCount-1);
      props.likesAction({id:poemId,likeAction:-1})

    }else{
      setFavorited(true)
      // setLikesCount(likesCount+1);
      props.likesAction({id:poemId,likeAction:+1})
      console.log(likesCount)
    }
  }

  const readMoreHandler = () =>{
    setExpanded(!expanded);
  }

  return (
    <>

      <Backdrop
          sx={{ zIndex: 20, color: 'black' }}
          open={expanded}
          onDoubleClick={handleExpandClick}
      />


      <Card
        // className='bg-background'
        className={`bg-secondary border-primary text-white ${expanded?"overflow-y-scroll":''}`}
        sx={{
          border:`1px solid`,
          maxWidth: expanded ? 'auto' : 'auto', //initially 345
          // maxHeight: expanded? '85%' :'auto',
          // maxHeight:'95%',
          maxHeight:expanded?'95%':'auto',
          minWidth: expanded ? 'auto':'fit-content',
          zIndex: expanded ? 30 : 0,
          position: expanded ? 'fixed' : 'relative',
          top: expanded ? '65%' : 'auto',
          left: expanded ? '50%' : 'auto',
          transform: expanded ? 'translate(-50%, -65%)' : 'none',
          marginX: 'auto',
          padding: 1,
          paddingX: 0,
          boxShadow: 3,
          backgroundColor: '#f0f0f0',
          transition: 'max-width 0.9s ease-in-out, z-index 0.9s ease-in-out, top 0.9s ease-in-out, left 0.9s ease-in-out, transform 0.9s ease-in-out',
        }}

        onDoubleClick ={handleFavoriteClick}
      >

      <CardHeader
        className='text-white font-extrabold'
        avatar={
          <Avatar sx={{ bgcolor: blue[700] }}>
            {props.children[3] ? props.children[3].substr(0,1):''}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" className='text-blue-700'>            
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              className="text-blue-700"
            >
              {expanded ? <CloseFullscreenIcon /> : ''}
           </ExpandMore>
          </IconButton>
        }
        title = {`${props.children[0]}`}
        subheader={`${new Date().toISOString().split('T')[0]}`}
      />


      <CardContent className='text-center'>
        {/* <Typography variant="body2" className='font-bold leading-6 break-words'> */}
          <pre>
            {
              (props.children[1] != null)?<>
              {(props.children[1].length > 250 && !expanded)?props.children[1].substr(0,249):props.children[1]}
              {(props.children[1].length > 250 && !expanded)?<Typography variant="body2" className='text-blue-700 inline cursor-pointer' onClick={readMoreHandler}>....read more</Typography>:''}
              </>
              :''
            }
          </pre>
        {/* </Typography> */}
      </CardContent>


      <CardActions disableSpacing className='text-blue-700'>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick} className={`${favorited ? 'text-red-500': 'text-blue-700'}`} >
          {favorited? <Favorite/> :<FavoriteBorderOutlined/>}
          <Typography>{likesCount}</Typography>
        </IconButton>
        <IconButton aria-label="share" className='text-blue-700'>
          {/* <ShareIcon /> */}
        </IconButton>
        <Typography variant="p" className='absolute right-4'> ~{props.children[3]}</Typography>
      </CardActions>

    </Card>
    </>
  );
}
 
export default PoemCard;

