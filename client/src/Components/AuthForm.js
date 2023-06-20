import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Components/AuthForm.css"

const AuthForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      console.log('Email and password are required to login');
      return;
    }

    if (!email.trim().toLowerCase().endsWith('@ctgclean.com')) {
      console.log('Email must end with "@ctgclean.com"');
      return;
    }

    try {
      const url = isSignUp ? 'http://10.93.0.198:5001/signup' : 'http://10.93.0.198:5001/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data); // Handle the response from the server

      // Redirect to home page on successful sign-up or login
      if (response.ok) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Garment Scoreboard</h2>
      <div className="container">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <h1 className='Title'>{isSignUp ?  'Sign Up' : 'Log In'}</h1>
            <div className='form'>
              <input className='email'
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input className='password'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
            <p>
              {isSignUp
                ? 'Already have an account?'
                : 'Don\'t have an account yet?'}
              <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
