import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {doc, setDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import './CreateAccount.css'

const CreateAccount = () => {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()
    const auth = getAuth()

    const handleEmailChange = (e) =>{
      setEmail(e.target.value)
    }
    
    const handlePasswordChange = (e) =>{
      setPassword(e.target.value)
    }
    const handleConfrimPasswordChange = (e) =>{
      setConfirmPassword(e.target.value)
    }
    const handleFullNameChange = (e) =>{
      setFullName(e.target.value)
    }
    
    const handlePhoneNumberChange = (e) =>{
      setPhoneNumber(e.target.value)
    }
    
    const createAccount = async () => {
        if (password !== confirmPassword) {
          setError('Password and Confirm Password must match');
          return;
        }
        try {
          // Replace the following placeholders with actual values:
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const userDocRef = doc(db, 'users', user.uid);
          
          // Replace 'userName' with the actual username you want to associate with the user.
          await setDoc(userDocRef, { fullname: fullName,  phone: phoneNumber});
      
          // console.log(`User registered successfully with Email: ${user.email}, Full-name: ${fullName} and Phone-Number: ${phoneNumber} ` );
      
          // Replace 'navigate' with your actual navigation function to redirect to the user's profile page.
          navigate('/profile');
        } catch (error) {
          setError(error.message);
        }
      };
  
    return (
    <div className='container'>
      <h1> Create User Account</h1>
    {error && <p style={{ color: 'red'}}> {error}</p>}

    <div className='form-group'>

      <label>UserName: </label>
      <input type='text' placeholder='Your Full-name' value={fullName} onChange={handleFullNameChange}/>
    </div>

    <div className='form-group'>

      <label>Phone Number: </label>
      <input type='mobile' placeholder='Phone Number' value={phoneNumber} onChange={handlePhoneNumberChange}/>
    </div>
  
    <div className='form-group'>
      <label>Email: </label>
      <input type='text' placeholder='Your Email Address' value={email} onChange={handleEmailChange}/>
    </div>
    
  
    <div className='form-group'>
  
      <label>Password: </label>
      <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
      
    </div>

    <div className='form-group'>
  
      <label>Confirm Password: </label>
      <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={handleConfrimPasswordChange} />
      
    </div>

  <div className='button'> 
    <button onClick={createAccount}> Create Account </button>
  </div>
  <Link to='/login' >Already have an Account ? Log In here </Link>

   </div>
    
  )

}


export default CreateAccount;
