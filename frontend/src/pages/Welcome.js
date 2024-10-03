import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

class Welcome extends React.Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-6">Log In</h1>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-6">
          <Login />
        </div>
        <p className="text-lg mb-4">Otherwise create an account</p>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <SignUp />
        </div>
      </div>
    );
  }
}

export default Welcome;