import React, { useState } from 'react';
import { Link, Navigate  } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import '../../assets/css/login.css'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    if (isAuthenticated)
        return <Navigate  to='/' />;
    
    return (
        <div className='auth'>
            <Helmet>
                <title>Hydrauleak Road - Login</title>
                <meta
                    name='description'
                    content='login page'
                />
            </Helmet>


<div className="LoginContainer">
    <div className='LoginContainerLeft'>
<h3>We locate leaks quickly to save water, money and the environment.</h3>
<p>Hydrauleak is an innovative, dynamic and expansionist organization that aims to modernize the water sector. The company's strategy is based on listening to its customers and innovating to meet their needs.</p>
    </div>
    <div className='LoginContainerRight'>
    <h1>Get started with <h1>Hydrauleak</h1> </h1>
            <h3 className='auth__title'>Create your account ! <h3 auth__lead> Sign In </h3></h3>
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
            <p className='auth__authtext'>
                Don't have an account? <Link className='auth__authtext__link' to='/signup'>Sign Up</Link>
            </p>
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