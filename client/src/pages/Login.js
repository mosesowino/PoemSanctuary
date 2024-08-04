import { useState } from 'react';
import axios from 'axios';
import { Backdrop, Button, Card, CircularProgress, Typography } from '@mui/material';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setLoginSuccess(true);
      setAuth(true);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='bg-secondary h-screen flex relative'>
        <Backdrop
            sx={{ zIndex: 20, color: '#fff' }}
            open={loginSuccess}
        />
        {loginSuccess?<CircularProgress className=' z-20 self-center absolute left-auto'/>:''}
        <Card className=' w-max px-12 mx-auto self-center bg-primary z-10'>
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
        <Button variant='outlined' type="submit" className='mb-1 mr-2 p-1'>Login</Button>
        <Typography variant="b">No account? sign up </Typography>
        </form>
        </Card>
    </div>
  );
};

export default Login;