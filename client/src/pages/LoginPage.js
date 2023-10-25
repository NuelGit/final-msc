import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {UserAuth} from '../hooks/UserContext'
import './Login.css'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    
    const navigate = useNavigate()
    const {signIn} = UserAuth()

    const handleEmailChange = (e) =>{
      setEmail(e.target.value)
    }
    
    const handlePasswordChange = (e) =>{
      setPassword(e.target.value)
    }
    
    const handleLogin = async () =>{
      if(!email || !password){
        setError('Please provide both Email and Passowrd')
        return
      }
      try {
        await signIn( email, password)
        navigate('/profile')

      } catch (e) {
        setError(e.message)
      }
  
    }
  
    return (
    <div className='login-container'>

      <h1> Secure files Login Page</h1>
      {error && <p className="error-message">{error}</p>}
  
    <div className='form-group'>
      <label> Email: </label>
      <input type='text' placeholder='Your Email Address' value={email} onChange={handleEmailChange}/>
    </div>
  
    <div className='form-group'>
      <label> Password: </label>
      <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
    </div>

  <div className='button'> 
    <button onClick={handleLogin}> Login </button>
  </div>

   </div>
    )
}

export default LoginPage;
