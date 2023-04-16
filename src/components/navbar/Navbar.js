import React, { Fragment, useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Alert from '../Alert';
import PropTypes from 'prop-types';
import axios from 'axios';
import "./Navbar.css"
import Login from "../../containers/login/Login"
import hydrauleaklogo from "../../assets/icons/hydrauleak-logo.png"
import HomeIcon from '@mui/icons-material/Home';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SummarizeIcon from '@mui/icons-material/Summarize';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
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
             <div id="logoContainer"> <img src={hydrauleaklogo} id="hydrauleak-logo" alt="hydrauleak"/>
             <hr className="solid"></hr>
             </div>
              {/* <li> <HomeIcon /> <a href="/">Dashboard</a></li>
                <li> <ReceiptLongIcon /> <a href="/contracts">Contracts</a></li>
                <li> <ContentPasteIcon /> <a href="/interventions">Interventions</a></li>
                <li> <SummarizeIcon /> <a href="/reports">Reports</a></li>
                <li> <GroupsIcon /> <a href="/client-management">Clients</a></li>
                <li> <PeopleOutlineIcon /> <a href="/user-management">users</a></li>
                <li> <PersonIcon /> <a href="/admin-profile">Profile</a></li> */}

            <Fragment>
                <NavLink activeClassName="activeLink"  to='/'> <HomeIcon style={{ fill: 'white', marginBottom: '-0.5rem' }}/> <span className='nav-txt'>Dashboard</span> </NavLink>
                <NavLink activeClassName="activeLink"  to='/contracts'><ReceiptLongIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }}/> <span className='nav-txt'> Contracts </span></NavLink>
                <NavLink activeClassName="activeLink"  to='/interventions'><ContentPasteIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /> <span className='nav-txt'>Interventions </span></NavLink>
                <NavLink activeClassName="activeLink"  to='/reports'><SummarizeIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /> <span className='nav-txt'>Reports </span></NavLink>
                <NavLink activeClassName="activeLink"  to='/client-management'> <GroupsIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /><span className='nav-txt'> Clients </span></NavLink>
                <NavLink activeClassName="activeLink"  to='/user-management'><PeopleOutlineIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /> <span className='nav-txt'> Users </span></NavLink>
                <NavLink activeClassName="activeLink"  to='/admin-profile'><PersonIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /><span className='nav-txt'> Profile </span></NavLink>
            </Fragment>
                </>
        )
    }
    else if(me.roles==="is_leaker"){
        return(
            <>
             <div id="logoContainer"> <img src={hydrauleaklogo} id="hydrauleak-logo" alt="hydrauleak"/>
             <hr className="solid"></hr>
             </div>
             <Fragment>
              <NavLink activeClassName="activeLink"  to='/'> <HomeIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /><span className='nav-txt'> Dashboard</span></NavLink>
              <NavLink activeClassName="activeLink"  to='/contracts'> <ReceiptLongIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /><span className='nav-txt'> Contracts </span></NavLink>
              <NavLink activeClassName="activeLink"  to='/interventions'><ContentPasteIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /> <span className='nav-txt'>Interventions </span></NavLink>
              <NavLink activeClassName="activeLink"  to='/reports'><SummarizeIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /> <span className='nav-txt'>Send Report</span></NavLink>
              <NavLink activeClassName="activeLink"  to='/leaker-profile'><PersonIcon  style={{ fill: 'white', marginBottom: '-0.5rem'  }} /><span className='nav-txt'> Profile </span></NavLink>
             </Fragment>
            {/* <li><a href="/">Dashboard</a></li>
                         <li><a href="/contracts">Contracts</a></li>
                         <li><a href="/interventions">Interventions</a></li>
                         <li><a href="/client-management">Clients</a></li>
                         <li><a href="/post-report">Send Reports</a></li>
                         <li><a href="/leaker-profile">Profile</a></li> */}
                         </>
        )
      
                     
    }
    else if(me.roles==="is_client"){
        return(
            <>
             <div id="logoContainer"> <img src={hydrauleaklogo} id="hydrauleak-logo" alt="hydrauleak"/>
             <hr className="solid"></hr>
             </div>
             <Fragment>
             <NavLink activeClassName="activeLink"  to='/'> <HomeIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /><span className='nav-txt'> Dashboard</span></NavLink>
             <NavLink activeClassName="activeLink"  to='/contracts'> <ReceiptLongIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /><span className='nav-txt'> Contracts </span></NavLink>
             <NavLink activeClassName="activeLink"  to='/reports'><SummarizeIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }} /> <span className='nav-txt'>Send Report</span></NavLink>
             <NavLink activeClassName="activeLink"  to='/client-profile'><PersonIcon  style={{ fill: 'white', marginBottom: '-0.5rem'  }} /><span className='nav-txt'> Profile </span></NavLink>
             </Fragment>
            {/* <li><a href="/">Dashboard</a></li>
                         <li><a href="/contracts">Contracts</a></li>
                         
                         <li><a href="/post-report">Send Reports</a></li>
                         <li><a href="/client-profile">Profile</a></li> */}
                         </>
        )
    }
 };



    const authLinks = (
        <Fragment>
        <NavLink activeClassName="activeLink"  onClick={logout} to='/login'><LogoutIcon style={{ fill: 'white', marginBottom: '-0.5rem'  }}  /> <span className='nav-txt'>Logout</span></NavLink>
        
    </Fragment>
      
    );

    const guestLinks = (
        <Fragment>
            <Link activeClassName="activeLink"  to='/login'>Login</Link>
            <Link activeClassName="activeLink"  to='/signup'>Sign Up</Link>
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
                    {/* <Link className='navbar__left__logo__link' to='/'>Hydrauleak Road</Link> */}
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