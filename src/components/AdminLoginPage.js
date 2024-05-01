import React from 'react'
import AvailableChats from './AvailableChats'
import ServerList from './ServerList'
import Chat from './Chat'
import ServerMembers from './ServerMembers'

export default function adminLoginPage() {
   const handleSubmit = () => {
    
   }
    return (
        <>
 
             <div className="login-body">
                <div className="login-container">
                    <h2 className="noselect">Admin Login</h2>
                    <h5 className="noselect">We're so excited to see you again!</h5>
                    <form className="login-form">
                        <h4 style={{ color: 'red', fontWeight: '500' }}> {error}</h4>
                        <label className="noselect">Email</label>
                        <div className="holder">
                            <FontAwesomeIcon icon={faUser} color="grey" className="usr-icon" id="usr-icon" />
                            <input type="email" required className="login-username noselect" placeholder="Email" id="email" name="username" onChange={event => {
                                setEmail(event.target.value);
                                setError('')
                                seteError('')
                            }} />
                        </div>
                        <h4 style={{ color: 'red', fontWeight: '500', marginBottom: '0' }}> {eerror}</h4>
                        <label className="noselect">password</label>
                        <div className="holder">
                            <FontAwesomeIcon icon={faKey} color="grey" className="pass-icon" />
                            <input type="password" required className="login-password noselect" placeholder="Password" id="password" name="password" onChange={event => {
                                setPassword(event.target.value)
                                setpError('')
                                setError('')
                            }} />
                        </div>
                        <h4 style={{ color: 'red', fontWeight: '500', marginBottom: '10px' }}> {perror}</h4>
                 
                    </form>
              
                    <button className='admin_loginDB'  onClick={handleSubmit}>Admin Login</button>

                </div>
            </div>

             
        </>
    )
}