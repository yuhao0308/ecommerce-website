import React from 'react';
import './CSS/LoginSignUp.css'; // Assuming CSS files are in a 'CSS' subfolder

const LoginSignUp = () => {
  return (
    <div className="login-signup">
      <div className="login-signup-container">
        <h1>Sign Up</h1>
        <div className="login-signup-fields">
            <input
              type="text"
              name="username"
              placeholder="Your Name"
            />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button>
          Continue
        </button>

        <p className="login-signup-login">
          Already have an account?{' '}
          <span>Login here</span>
        </p>

        <div className="login-signup-agree">
          <input type="checkbox" name="agree" id="" />
          <p>
            By continuing, I agree to the terms of use and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;