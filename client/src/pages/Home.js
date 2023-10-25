import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

const Home = () => {

    return (
    
        <div className='home-container'>
                  
              <h1>Secure File Storage Home Page</h1>
              <p>
                This Project: 'Secure file storage application', uses hybrid cryptography to protect your files. 
                <br/> Designed and Implemented by <strong> Ebele Emmanuel Nweke</strong>. <br/> under the supervision of 
                <strong> Prof Asagba Oghenekaro</strong>, October 2023.
                <br/> You can use this platform to upload, and securely store your files in the cloud.
              </p>
              <p>
                To get started, please log-In or Register to create new account if you don't have an account yet. 
                Once logged in, you'll have access to the dashboard, and other features.
              </p>
              
              <div> 

              <p> <strong>Already have an Account?</strong> <Link to='/login'>Log-In Here </Link>  </p>
              <p> <strong>Don't have an Account? </strong><Link to='/create-user'>Register Here </Link>  </p>
              </div>

   </div>
              
            
          )
}


export default Home