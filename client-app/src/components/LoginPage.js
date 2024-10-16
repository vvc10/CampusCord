// components/Login.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { TbUnlink } from "react-icons/tb";
import axios from 'axios';
import url from '../url.json';
import campusImg from '../components/img/1.jpg'


function Login({ setLoginState, isAdmin, setIsAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [eerror, seteError] = useState('');
  const [perror, setpError] = useState('');
  const [adminCodeError, setAdminCodeError] = useState('');

  function handleValidationLogin() {
    let formIsValid = true;

    if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formIsValid = false;
      seteError('Enter a valid email');
    }

    if (password.length < 8) {
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
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      if (isAdmin) {
        formData.append('adminCode', adminCode);
      }

      axios.post(`${url.server}auth/login`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      }).then(res => {
        if (!res.data.error) {
          setLoginState(true);
        } else {
          setError(res.data.error);
        }
      });
    }
  }

  return (
    <div className="login_form w-[100%] flex flex-row gap-4 items-center">
      
      <div className='h-fit w-[40%] border-l-indigo-900 mx-[10px]'>
        <h2 className="flex flex-row items-center text-2xl font-bold mb-4 text-center">
          CampusC<TbUnlink className='text-[16px]' />rd
        </h2>
        <h5 className="text-gray-600 text-left mb-6">We're so excited to see you again!</h5>
        <form className="space-y-4">
          <h4 className="text-red-500 font-medium">{error}</h4>
          <div>
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FontAwesomeIcon icon={faUser} color="grey" className="p-2" />
              <input type="email" required className="flex-1 p-2 outline-none" placeholder="Email" onChange={(e) => { setEmail(e.target.value); seteError(''); }} />
            </div>
            <h4 className="text-red-500 font-medium">{eerror}</h4>
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FontAwesomeIcon icon={faKey} color="grey" className="p-2" />
              <input type="password" required className="flex-1 p-2 outline-none" placeholder="Password" onChange={(e) => { setPassword(e.target.value); setpError(''); }} />
            </div>
            <h4 className="text-red-500 font-medium">{perror}</h4>
          </div>
          <label className="inline-flex items-center mt-2">
            <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="form-checkbox" />
            <span className="ml-2 text-gray-700">Login as Admin</span>
          </label>
          {isAdmin && (
            <div>
              <label className="block text-gray-700">Admin Code</label>
              <input type="text" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Admin Code" onChange={(e) => { setAdminCode(e.target.value); setAdminCodeError(''); }} />
              <h4 className="text-red-500 font-medium">{adminCodeError}</h4>
            </div>
          )}
          <button type="button" onClick={handleSubmitLogin} className="w-full py-2 mt-4 text-white bg-black rounded-md hover:bg-black transition">Login</button>
        </form>

      </div>
      
      <div className='rg_img w-[60%] h-[100%] relative'>
        <img src={campusImg} className="w-full h-full object-cover rounded-[15px]" />
        <h2 className='absolute top-[38%] right-[-30%] rotate-90 text-[63px] font-[900] text-white'>Campuscord</h2>
      </div>

    </div>
  );
}

export default Login;
