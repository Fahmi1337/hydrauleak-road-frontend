import React, { Fragment, useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Alert from '../Alert';
import PropTypes from 'prop-types';
import axios from 'axios';
import "./Navbar.css"
import Login from "../../containers/login/Login"

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {


    const [me, setMe] = useState([]);




    useEffect(() => {
        getMe() 
      }, []);
    
    
       const getMe = async () => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/api/user/me`,
              {
                method: "GET",
        
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
              .then((response) => response.json())
              .then((data) => setMe(data));
        return response;
          } catch (error) {
            console.log(error);
          }
        };
  

console.log("me?", me.roles)


    

const getUserRoutes = () => { 
    if(me.roles==="is_admin"){
        return(
            <>
              <li><a href="/">Dashboard</a></li>
                <li><a href="/contracts">Contracts</a></li>
                <li><a href="/interventions">Interventions</a></li>
                <li><a href="/reports">Reports</a></li>
                <li><a href="/client-management">Clients</a></li>
                <li><a href="/user-management">users</a></li>
                <li><a href="/admin-profile">Profile</a></li>
                </>
        )
    }
    else if(me.roles==="is_leaker"){
        return(
            <>
            <li><a href="/">Dashboard</a></li>
                         <li><a href="/contracts">Contracts</a></li>
                         <li><a href="/interventions">Interventions</a></li>
                         <li><a href="/client-management">Clients</a></li>
                         <li><a href="/post-report">Send Reports</a></li>
                         <li><a href="/leaker-profile">Profile</a></li>
                         </>
        )
      
                     
    }
    else{
        return(
            <>
            <li><a href="/">Dashboard</a></li>
                         <li><a href="/contracts">Contracts</a></li>
                         
                         <li><a href="/post-report">Send Reports</a></li>
                         <li><a href="/client-profile">Profile</a></li>
                         </>
        )
    }
 };



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
        <nav className="left-nav">
            <ul>
            <div className='navbar__left'>
                <div className='navbar__left__logo'>
                    <Link className='navbar__left__logo__link' to='/'>Hydrauleak Road</Link>
                </div>                   
            </div>
                {/* <li><a href="/">Dashboard</a></li>
                <li><a href="/contracts">Contracts</a></li>
                <li><a href="/interventions">Interventions</a></li>
                <li><a href="/reports">Reports</a></li>
                <li><a href="/client-management">Clients</a></li>
                <li><a href="/user-management">users</a></li> */}
               { getUserRoutes()}
                
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