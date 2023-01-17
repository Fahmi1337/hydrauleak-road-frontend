import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
    <div className='container'>
        <div className='jumbotron mt-5'>
            <h1 className='display-4'>Welcome to Dashboard Hydrauleak Road!</h1>
            <p className='lead'>This is an incredible Hydrauleak Road system with production level features!</p>
            <hr className='my-4' />
            <p>Click the Log In button</p>
            <Link className='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
        </div>
    </div>
);

export default Dashboard;
