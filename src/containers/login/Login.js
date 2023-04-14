import React, { useState } from 'react';
import { Link, Navigate  } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import hydraulogo from "../../assets/icons/Hydrauleak.png"
import hydrauleakBackground from "../../assets/icons/hydrauleak-background.png"
import '../../assets/css/login.css'
import SignUp from "../Signup"
const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loginLayout, setLoginLayout] = useState(true);
    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    if (isAuthenticated)
        return <Navigate  to='/' />;
    
    return (
        <div className='loginBackgroundContainer'>

        <div className='auth' style={{backgroundImage: "url(" + hydrauleakBackground + ")"}}>
            <Helmet>
                <title>Hydrauleak Road - Login</title>
                <meta
                    name='description'
                    content='login page'
                />
            </Helmet>


<div className="LoginContainer" >
    <div className='LoginContainerLeft'  >
        <div className='loginTextLeft'><h1>We locate leaks quickly to save water, money and the environment.</h1>
        <p>Hydrauleak Road is a user-friendly app that helps water leak detection companies manage client data, including cities and companies. The app streamlines the process of finding water leaks on the street, making it an essential tool for optimizing operations and reducing costs while providing exceptional service to clients.</p>
 
        </div>

  </div>
    <div className='LoginContainerRight'>
        <div>
        <img src={hydraulogo} alt="hydrauleak logo"/>
        </div>
      <div className='bigTitles'>
      <h1>Get started with</h1> 
      <h1 style={{color: "#0671E0"}}>Hydrauleak</h1> 
      </div>
 {/* <div className='signInSignUp'>
<h3> Sign In  </h3>  <h3 className='auth__title' style={{color: "#0671E0"}}> <Link  style={{color: "#0671E0"}} to='/signup'>Sign Up</Link> </h3> 
 </div> */}
            <div className='signInSignUp'>
<h3 style={{ color: !loginLayout ? "#0671E0" : "black"}}  onClick={(e) => { e.preventDefault(); setLoginLayout(true);}}> Sign In  </h3>  <h3 className='auth__title' style={{ color: loginLayout ? "#0671E0" : "black"}} onClick={(e) => { e.preventDefault(); setLoginLayout(false);}}> Sign Up</h3> 
 </div>
{loginLayout && (
     <div className='loginContainer'>
     <form className='auth__form' onSubmit={e => onSubmit(e)}>
                    <div className='auth__form__group'>
                    <label>Email :</label>
                        <input 
                            className='auth__form__input'
                            type='email'
                            placeholder='Email'
                            name='email' value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='auth__form__group'>
                    <label>Password :</label>
                        <input
                            className='auth__form__input'
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            minLength='5'
                            
                        />
                    </div>
                    <button className='auth__form__button'>Login</button>
                </form>
     </div>
)}

{!loginLayout && (
     <div className='signUpContainer'>
        <SignUp/>
     </div>
)}

        </div>
    </div>
</div>
</div>
            
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);