import React from 'react'
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../hooks/UserContext'

const ProtectedRoute = ({children}) => {
    const {user} = UserAuth()

    if(!user){
        return <Navigate to='/' />
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute