import React from 'react'
// import {useNavigate} from 'react-router-dom'
import {UserAuth} from  '../hooks/UserContext'
import './Profile.css'

const Profile = () => {
    const { user, userProfile} = UserAuth()
    
  return (
    <> 
    <div>User's Profile</div>
    <p>User Email: {user && user.email} </p>

    <div>
        <p> User Full-Name: { userProfile && userProfile.fullname}</p>
        <p> User phone-Number: { userProfile && userProfile.phone}</p>
    </div>

    <div>
        {/* <button onClick={handleLogout}> Log-Out</button> */}
    </div>
  </>
  )
}

export default Profile

// const navigate = useNavigate()

    // const handleLogout = async() =>{
    //     try {
    //        await logout() 
    //        navigate('/')
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }
