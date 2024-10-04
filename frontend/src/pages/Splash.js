import React from 'react';
import Login from '../components/Login.js';
import Register from '../components/Register.js';
 

class Splash extends React.Component {
    render() {
        return (
            <div className='min-h-screen flex flex-col justify-center items-center bg-primary'>
                <div className='flex flex-col justify-center items-center mb-8'>
                    <h1 className='font-JunK text-9xl text-secondary'>JunK</h1>
                </div>
                <div className='grid grid-cols-2 gap-20'>
                    <div className='flex justify-center items-center'>
                        <Login />
                    </div>
                    <div className='flex justify-center items-center'>
                        <Register />
                    </div>
                </div>
            </div>
        );
    }
}

export default Splash;
