import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import ShareIcon from '@mui/icons-material/Share';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Backdrop } from '@mui/material';




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
  console.log(`console ${props.children}`)
  const [expanded, setExpanded] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    setFavorited(!favorited);
  }

  const readMoreHandler = () =>{
    setExpanded(!expanded);
  }

  return (
    <>

      <Backdrop
          sx={{ zIndex: 20, color: '#fff' }}
          open={expanded}
          onClick={handleExpandClick}
      />


      <Card
        className='bg-background'
        sx={{
          maxWidth: expanded ? '80%' : 345,
          zIndex: expanded ? 30 : 0,
          position: expanded ? 'fixed' : 'relative',
          top: expanded ? '50%' : 'auto',
          left: expanded ? '50%' : 'auto',
          transform: expanded ? 'translate(-50%, -50%)' : 'none',
          marginX: 'auto',
          padding: 2,
          boxShadow: 3,
          // backgroundColor: '#f0f0f0',
          transition: 'max-width 0.9s ease-in-out, z-index 0.9s ease-in-out, top 0.9s ease-in-out, left 0.9s ease-in-out, transform 0.9s ease-in-out',
        }}

        onDoubleClick ={handleFavoriteClick}
      >

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" className='text-blue-700'>
            <MoreVertIcon />
          </IconButton>
        }
        // title="Shrimp and Chorizo Paella"
        title = {`${props.children[0]}`}
        subheader={`${new Date().toISOString().split('T')[0]}`}
      />
      <CardMedia
        component="img"
        height="194"
        // image="/static/images/cards/paella.jpg"
        alt="random image"
      />


      <CardContent>
        <Typography variant="body2" color="text.secondary" className='font-bold leading-6'>
        {(props.children[1].length > 10)?props.children[1].substr(0,9):props.children[1]}
        {(props.children[1].length > 10 & !expanded)?<Typography variant="body2" className='text-blue-700 inline cursor-pointer' onClick={readMoreHandler}> ....read more</Typography>:''}
        {expanded?props.children[1]:''}
        </Typography>
      </CardContent>


      <CardActions disableSpacing className='text-blue-700'>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick} className={`${favorited ? 'text-red-500': 'text-blue-700'}`} >
          {favorited? <Favorite/> :<FavoriteBorderOutlined/>}
        </IconButton>
        <IconButton aria-label="share" className='text-blue-700'>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          className="text-blue-700"
        >
          {expanded ? <CloseFullscreenIcon /> : ''}
        </ExpandMore>
      </CardActions>


      <Collapse in={expanded} timeout="auto" unmountOnExit>

        <CardContent>
          <Typography paragraph>

          </Typography>
        </CardContent>

      </Collapse>

    </Card>
    </>
  );
}
 
export default PoemCard;

