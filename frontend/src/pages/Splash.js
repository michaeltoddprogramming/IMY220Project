import React from 'react';
import Login from '../components/Login'
import SignUp from '../components/SignUp';

class Splash extends React.Component {
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <Login />
        <br/>
        <p>Otherwise create an account</p>
        <SignUp />
      </div>
    );
  }
}

export default Splash;