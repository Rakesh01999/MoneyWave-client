
// --------- Login.jsx ----------

import React, { useContext, useEffect, useState } from 'react';
import { FacebookAuthProvider, getAuth, signInWithPopup, updateProfile } from "firebase/auth";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import useAuth from '../../hooks/useAuth';
import { Button, TextField } from '@mui/material';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const Login = () => {
  const [usr, setUsr] = useState(null);
  const { googleSignIn } = useAuth();
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || "/";
  console.log('location.state', location.state)

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "User Login Successful .",
          showClass: {
            popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
          },
          hideClass: {
            popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
          }
        });
        navigate(from, { replace: true });
      })
      .catch((error)=> {
        console.error(error);
        toast.error('Invalid UserEmail/Password');
      })
  }


  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        console.log(result.user)
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
        // axiosPublic.post('/login', userInfo)
          .then(res => {
            console.log(res.data)
            navigate('/');
          })
      });
  };

  //  ---------- 
  // useEffect(() => {
  //   if (usr) {
  //     navigate(location?.state ? location.state : '/');
  //   }
  // }, [usr, location, navigate]);



  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('path/to/your/background-image.jpg')" }}>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-600 mb-6 text-center animate__animated animate__fadeInDown">
            Login now!
          </h1>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <TextField
                label="Email"
                type="email"
                name="email"
                placeholder="email"
                required
                fullWidth
              />
            </div>
            <div className="mb-6">
              <TextField
                label="Password"
                type="password"
                name="password"
                required
                placeholder="password"
                fullWidth
              />
              <div className="text-right">
                <Link to="#" className="text-blue-500 text-sm">
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="h-11 mb-4"
            >
              Login
            </Button>
          </form>

          <p className="text-center text-lg mb-4">
            New to this site? Please{' '}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>

          <div className="text-center mb-4">
            <span className="text-lg font-semibold">or</span>
          </div>

          <div>
            <Button
              onClick={handleGoogleSignIn}
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<FcGoogle />}
              className="mb-4"
            >
              Continue with Google
            </Button>
            {/* <Button
              onClick={handleGithubSignIn}
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<FaGithub />}
              className="mb-4"
            >
              Continue with GitHub
            </Button> */}
          </div>

          <p className="text-center text-lg">
            Go back to{' '}
            <Link to="/" className="text-blue-600">
              Home
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;


