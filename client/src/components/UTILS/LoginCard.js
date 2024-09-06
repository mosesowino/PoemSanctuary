import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { Cancel } from "@mui/icons-material";
import { useState } from "react";





const LoginCard = (props) =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUserName] = useState('');
    const [loginIsVisible, setLoginIsVisible] = useState(true);
    const[login, setlogin] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          if(username){
            const signUpResponse = await axios.put('http://localhost:3002/register',{email,password,username})
            console.log(signUpResponse.data.message)
          }
          const response = await axios.post('http://localhost:3002/login', { email, password });
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

      const handleSignUpClick = () =>{
        setlogin(!login)
      }

    return(
      <>
      {loginIsVisible &&
        <Card className=' w-max px-12 mx-auto self-center fixed bottom-1/2 z-30 backdrop-blur-md bg-black/10'>
            <Cancel className="absolute right-1 top-1 text-red-600" onClick={handleCancelClick}/>
          <form onSubmit={handleLogin}>
          <div className=' my-4'>
              {/* <label className='block'>Email:</label> */}
              <input
              className='border-none outline-none shadow-inner p-2 rounded-md mr-2'
              placeholder='enter email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          {!login?
           <>
            <div className="mb-4">
            {/* <label className='block'>username:</label> */}
                <input
                className='border-none outline-none p-2 rounded-md mr-2'
                placeholder='username'
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                />
            </div>
           </>:''
          }
          <div className=' mb-4'>
              {/* <label className='block'>Password:</label> */}
              <input
              className='border-none outline-none p-2 rounded-md mr-2'
              placeholder='enter password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          {!login?
          <>

            <div className=' mb-4'>
                {/* <label className='block'>Password:</label> */}
                <input
                className='border-none outline-none p-2 rounded-md mr-2'
                placeholder='confirm password'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
          </>:''
          }
          <Button variant='contained' type="submit" className='mb-1 mr-2 p-1'>{login?'Login':'sign up'}</Button>
          <Typography className=" bg-blend-difference">{login?'No account?':' '} <Typography variant="p" className="text-white cursor-pointer" onClick={handleSignUpClick}>{login?'sign up':'login' }</Typography></Typography>
          </form>
        </Card>
      }
      </>
    )
}

export default LoginCard;