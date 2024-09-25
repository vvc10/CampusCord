import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import url from "../url.json";
import './css/SignUpPage.css'
import { Link } from 'react-router-dom';
const SignUpPage = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [eerror, seteError] = useState('');
    const [perror, setpError] = useState('');
    const [uerror, setuError] = useState('');

    function handleValidationRegister() {
        let fields = { email, username, password };
        let formIsValid = true;

        if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^[a-zA-Z-0-9]+$/)) {
                formIsValid = false;
                setuError('invalid username');
            }
        }
        if (fields["username"] === '') {
            formIsValid = false;
            setuError('username cannot be empty');
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                seteError('Invalid email');
            }
        }
        if (fields["email"] === "") {
            formIsValid = false;
            seteError('Enter a valid email');
        }
        if (fields['password'].length < 8) {
            formIsValid = false;
            setpError('Password must be at least 8 characters');
        }
        return formIsValid;
    }

    function handleSubmitRegister() {
        if (handleValidationRegister()) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': url.frontend,
                    'Access-Control-Allow-Credentials': 'true',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, displayName: username, password: password })
            };
            fetch(`${url.server}auth/register`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.error === null) {
                        toggleForm();
                    }
                    else if (data.error === 'not valid') {
                        setError('not valid');
                    }
                    else {
                        setError('User already registered');
                    }
                });
        }
    }

    return (
        <div className="sign-body">
            <div className='signup-cont-left'>
                <img />
            </div>
            <div className="signup-container">
                <div className='signup-cont-div'>
                    <h2 className="noselect">Create an account</h2>
                    <form className="Sign-form">
                        <h4 style={{ color: 'red', fontWeight: '500' }}> {error}</h4>
                        <label className="noselect">Email</label>
                        <div className="holder">
                            <FontAwesomeIcon icon={faEnvelopeOpenText} color="grey" className="pass-icon" />
                            <input type="email" required className="login-email noselect" placeholder="Email" id="Email" onChange={event => {
                                setEmail(event.target.value);
                                setError('');
                                seteError('');
                            }} />
                        </div>
                        <h4 style={{ color: 'red', fontWeight: '500', marginBottom: '0' }}> {eerror}</h4>
                        <label className="noselect">Username</label>
                        <div className="holder">
                            <FontAwesomeIcon icon={faUser} color="grey" className="usr-icon" id="usr-icon" />
                            <input type="text" required className="login-username noselect" placeholder="Username" id="username" onChange={event => {
                                setUsername(event.target.value);
                                setuError('');
                                setError('');
                            }} />
                        </div>
                        <h4 style={{ color: 'red', fontWeight: '500', marginBottom: '0px' }}> {uerror}</h4>
                        <label className="noselect">Password</label>
                        <div className="holder">
                            <FontAwesomeIcon icon={faKey} color="grey" className="pass-icon" />
                            <input type="password" required className="login-password noselect" placeholder="Password" id="password" onChange={event => {
                                setPassword(event.target.value);
                                setpError('');
                                setError('');
                            }} />
                        </div>
                        <h4 style={{ color: 'red', fontWeight: '500', marginBottom: '10px' }}> {perror}</h4>
                    </form>
                    <button type="submit" className="btn login noselect" onClick={handleSubmitRegister}>
                        Let's go
                    </button>
                    <div className="btn sign-up noselect" onClick={toggleForm}>
                        Have an account?
                        <Link to='/login'>
                            <span>Log in</span>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
