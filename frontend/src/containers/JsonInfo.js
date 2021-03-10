import React from 'react'
import {useAuth0} from '@auth0/auth0-react';


const JsonInfo = () => {
  const {user, isAuthenticated} = useAuth0();

  return (
    isAuthenticated && ( 
      <div>
         <img src={user.picture} alt={user.name} width="100px"/>  
        <h2>{user.name}</h2>
        <p>{user.email}</p>


        {/* // requres JSON-pretty
        <JSONPretty data={user}/>  */}

        {JSON.stringify(user, null, 2)}
      </div>
    )
  )
}


export default JsonInfo