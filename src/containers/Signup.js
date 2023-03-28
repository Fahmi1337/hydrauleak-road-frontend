import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate  } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setAlert } from '../actions/alert';
import { signup } from '../actions/auth';
import PropTypes from 'prop-types';

const SignUp = ({ setAlert, signup, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        re_password: ''
    });

    const { name, email, phone, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password !== re_password)
            setAlert('Passwords do not match', 'error');
        else
            signup({ name, email, phone, password, re_password });
    };

    if (isAuthenticated)
        return <Navigate  to='/' />;
    
    return (
        <div className='auth'>
            <Helmet>
                <title>Hydrauleak Road - Sign Up</title>
                <meta
                    name='description'
                    content='sign up page'
                />
            </Helmet>
            {/* <h1 className='auth__title'>Sign Up</h1>
            <p className='auth__lead'>Create your Account</p> */}
            <form className='auth__form' onSubmit={e => onSubmit(e)}>
                <div className='auth__form__group'>
                <label>Name :</label>
                    <input 
                        className='auth__form__input'
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div className='auth__form__group'>
                <label>Email :</label>
                    <input 
                        className='auth__form__input'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div className='auth__form__group'>
                <label>Phone :</label>
                    <input 
                        className='auth__form__input'
                        type='phone'
                        placeholder='Phone'
                        name='phone'
                        value={phone}
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
                        minLength='6'
                    />
                </div>
                <div className='auth__form__group'>
                <label>Confirm Password :</label>
                    <input
                        className='auth__form__input'
                        type='password'
                        placeholder='Confirm Password'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                    />
                </div>
                <button className='auth__form__button'>Register</button>
            </form>
            {/* <p className='auth__authtext'>
                Already have an account? <Link className='auth__authtext__link' to='/login'>Sign In</Link>
            </p> */}
        </div>
    );

};

SignUp.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, signup })(SignUp);