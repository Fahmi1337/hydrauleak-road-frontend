import React, { Fragment } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Alert from '../Alert';
import PropTypes from 'prop-types';
import "./Navbar.css"
import Login from "../../containers/login/Login"

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {



  

    const authLinks = (
        <a className='navbar__top__auth__link' onClick={logout} href='/login'>Logout</a>
    );

    const guestLinks = (
        <Fragment>
            <Link className='navbar__top__auth__link' to='/login'>Login</Link>
            <Link className='navbar__top__auth__link' to='/signup'>Sign Up</Link>
        </Fragment>
    );
    const loggedOut = (
        <Fragment>
            <Routes>
            <Route path="/redirect" element={ <Navigate to="/login" /> } />
            </Routes>
          
        </Fragment>
    );
    const loggedIn = (
        <Fragment>
        <nav class="left-nav">
            <ul>
            <div className='navbar__left'>
                <div className='navbar__left__logo'>
                    <Link className='navbar__left__logo__link' to='/'>Hydrauleak Road</Link>
                </div>                   
            </div>
                <li><a href="/">Dashboard</a></li>
                <li><a href="/contracts">Contracts</a></li>
                <li><a href="/interventions">Interventions</a></li>
                <li><a href="/reports">Reports</a></li>
                
            <div className='navbar__left__auth'>
                { !loading && (<Fragment>{ localStorage.getItem("token") ? authLinks : guestLinks }</Fragment>) }
            </div>
            </ul>
        </nav>
        
        <Alert />
    </Fragment>
    );
 
console.log("is authenticated?", isAuthenticated);






    return (
       <div>
        {/* { !loading && (<Fragment>{ localStorage.getItem("token") ? loggedIn : guestLinks }</Fragment>) } */}
        { !loading && (<Fragment>{ localStorage.getItem("token") ? loggedIn : loggedOut }</Fragment>) }
    
       </div>
          
        
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);