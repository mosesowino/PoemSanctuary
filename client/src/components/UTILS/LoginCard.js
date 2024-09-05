import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { Cancel } from "@mui/icons-material";
import { useState } from "react";





const LoginCard = (props) =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginIsVisible, setLoginIsVisible] = useState(true)

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/login', { email, password });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          props.loginStatus(true)
          setEmail('');
          setPassword('');
        } catch (error) {
          console.error('Login failed:', error);
        }
      };

      const handleCancelClick = () =>{
        console.log("cancelled!!!")
        setLoginIsVisible(false)
        
      }

    return(
      <>
      {loginIsVisible &&
        <Card className=' w-max px-12 mx-auto self-center fixed bottom-1/2 z-30 backdrop-blur-md bg-black/10'>
            <Cancel className="absolute right-1 top-1 text-red-600" onClick={handleCancelClick}/>
          <form onSubmit={handleLogin}>
          <div className=' my-4'>
              <label className='block'>Email:</label>
              <input
              className='border-none outline-none shadow-inner p-2 rounded-md mr-2'
              placeholder='enter email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className=' mb-4'>
              <label className='block'>Password:</label>
              <input
              className='border-none outline-none p-2 rounded-md mr-2'
              placeholder='enter password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <Button variant='contained' type="submit" className='mb-1 mr-2 p-1'>Login</Button>
          <Typography variant="b" className=" bg-blend-difference">No account? <Typography variant="p" className="text-white">sign up </Typography></Typography>
          </form>
        </Card>
      }
      </>
    )
}

export default LoginCard;