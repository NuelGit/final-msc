import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {UserAuth}  from '../hooks/UserContext'
import './Header.js'

const Header = () => {
    const {user, logout, userProfile} = UserAuth()
    const navigate = useNavigate()

    const handleLogout = async() =>{
        try {
           await logout() 
           navigate('/')
        } catch (error) {
            console.log(error.message)
        }
    }

  return (

    <header className='header'>
    <nav>
      <ul>
       
        {!user ? (
            
          <>
            <li><Link to="/">Home Page</Link></li>
            {/* <li><Link to="/">Login</Link></li> */}
          </>
        ) : (
          <>
             {/* <li><Link to="/profile">Profile</Link></li> */}
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/uploads">File Upload</Link></li>
            <li><Link to="/view-files">View and Download Uploaded Files</Link></li>
            
           
            <li> Welcome! { user.email} </li>
            <li>  {userProfile && userProfile.fullname}</li>
            <li>
            <button onClick={handleLogout}> Log-Out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  </header>
);

}

export default Header