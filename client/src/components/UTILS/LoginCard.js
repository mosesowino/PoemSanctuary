import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { Cancel } from "@mui/icons-material";
import { useState } from "react";

const LoginCard = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUserName] = useState('');
  const [loginIsVisible, setLoginIsVisible] = useState(true);
  const [login, setlogin] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (username.length > 0) {
        const signUpResponse = await axios.put('/register', { email, password, username });
        console.log(signUpResponse.data.message);
        props.isLoggedIn(true);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUserName('');
      } else {
        const response = await axios.post('/login', { email, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        props.isLoggedIn(true);
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleCancelClick = () => {
    console.log("cancelled!!!");
    setLoginIsVisible(false);
    props.blurr(false)
  };

  const handleSignUpClick = () => {
    setlogin(!login);
  };
  

  return (
    <>
      {loginIsVisible ? (
        <Card className='w-max px-12 mx-auto self-center fixed top-16 right-4 z-30 backdrop-blur-md bg-black/10'>
          <Cancel className="absolute right-1 top-1 text-red-600" onClick={handleCancelClick} />
          <form onSubmit={handleLogin}>
            <div className='my-4'>
              <input
                className='border-none outline-none shadow-inner p-2 rounded-md mr-2'
                placeholder='enter email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {!login && (
              <div className="mb-4">
                <input
                  className='border-none outline-none p-2 rounded-md mr-2'
                  placeholder='username'
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            )}
            <div className='mb-4'>
              <input
                className='border-none outline-none p-2 rounded-md mr-2'
                placeholder='enter password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!login && (
              <div className='mb-4'>
                <input
                  className='border-none outline-none p-2 rounded-md mr-2'
                  placeholder='confirm password'
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            <Button variant='contained' type="submit" className='mb-1 mr-2 p-1'>
              {login ? 'Login' : 'Sign up'}
            </Button>
            <Typography className="bg-blend-difference">
              {login ? 'No account?' : ' '} 
              <Typography variant="body1" className="text-white cursor-pointer" onClick={handleSignUpClick}>
                {login ? 'sign up' : 'login'}
              </Typography>
            </Typography>
          </form>
        </Card>
      ):''}
    </>
  );
};

export default LoginCard;
