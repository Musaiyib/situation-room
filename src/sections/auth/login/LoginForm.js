import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import axios from 'axios';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const handleClick = () => {
    axios
      .post('http://localhost:4000/api/users/', {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.role !== 'admin') {
            alert('Access denied');
            return;
          }
          setStatus('Success');
          console.log(res.data);
          localStorage.setItem('airtime', JSON.stringify(res.data));
          navigate('/dashboard', { replace: true });
        }
      })
      .catch((error) => {
        setStatus(error.response.data.message);
        console.log(error.response);
      });
  };

  return (
    <>
      <Stack spacing={3}>
        {status !== 'Success' ? (
          <Typography variant="body2" color="red" alignSelf="center">
            {status}
          </Typography>
        ) : null}
        <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
