import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { login } from './features/userSlice';
import { useDispatch } from 'react-redux';
import './login.css';
import url from "./url.json";
import AppHome from './components/AppHome';
import Loading from "./components/Loading";
import { ImPowerCord } from "react-icons/im";
import { TbUnlink } from "react-icons/tb";
import bgImg from './components/img/1.jpg';
import Landing from './components/Landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import
import Login from './components/LoginPage';

function App() {
  let [ShowApp, setShowApp] = useState(false);
  let [loginState, setLoginState] = useState(false);
  let [isLoaded, setisLoaded] = useState(false);
  let [loginOp, setLogO] = useState(true);
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [error, setError] = useState('');
  var [eerror, seteError] = useState('');
  var [perror, setpError] = useState('');
  var [username, setUsername] = useState('');
  var [uerror, setuError] = useState('');
  var [adminCode, setAdminCode] = useState('');
  var [adminCodeError, setAdminCodeError] = useState('');
  var [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': url.frontend,
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      },
      url: `${url.server}auth/user`,
    };
    axios(requestOptions)
      .then(res => {
        setisLoaded(true);
        if (res.data !== '') {
          dispatch(login({
            id: res.data.id,
            name: res.data.name,
            profile: res.data.profile,
            email: res.data.email,
            server: res.data.server
          }));
          setShowApp(true);
        }
      });
  }, [dispatch, loginState]);

  // Prevent drag and drop default behavior
  window.addEventListener("dragover", function (e) {
    e.preventDefault();
  }, false);

  window.addEventListener("drop", function (e) {
    e.preventDefault();
  }, false);

  function urlencodeFormData(fd) {
    var s = '';
    function encode(s) { return encodeURIComponent(s).replace(/%20/g, '+'); }
    for (var pair of fd.entries()) {
      if (typeof pair[1] === 'string') {
        s += (s ? '&' : '') + encode(pair[0]) + '=' + encode(pair[1]);
      }
    }
    return s;
  }

  function handleValidationLogin() {
    let fields = { email, password };
    let formIsValid = true;

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

    if (isAdmin && adminCode === "") {
      formIsValid = false;
      setAdminCodeError('Admin code is required');
    }

    return formIsValid;
  }

  function handleSubmitLogin() {
    if (handleValidationLogin()) {
      let formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      if (isAdmin) {
        formData.append('adminCode', adminCode);
      }

      axios({
        method: "POST",
        url: `${url.server}auth/login`,
        headers: {
          'Access-Control-Allow-Origin': url.frontend,
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
        withCredentials: true,
        data: urlencodeFormData(formData)
      }).then((res) => {
        if (res.data.error === null) {
          setLoginState(true);
        } else {
          setError(res.data.error);
        }
      });
    }
  }

  function handleValidationRegister() {
    let fields = { email, username, password };
    let formIsValid = true;

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z0-9]+$/)) {
        formIsValid = false;
        setuError('Invalid username');
      }
    }
    if (fields["username"] === '') {
      formIsValid = false;
      setuError('Username cannot be empty');
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
            setLogO(true);
          } else if (data.error === 'not valid') {
            setError('Not valid');
          } else {
            setError('User already registered');
          }
        });
    }
  }

  return (
    <Router>
      <div className="App min-h-screen flex items-center justify-center bg-black">
        {isLoaded ? (
          ShowApp ?
            <AppHome /> :
            <Routes>
              <Route path="/" element={<Landing setLoginState={setLoginState} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
            </Routes>
        ) :
          <Loading />
        }




      </div>
    </Router>

  );
}

export default App;
