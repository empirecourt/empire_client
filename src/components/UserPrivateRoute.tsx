import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/userSlice'
import Redirect from './redirect'

function UserPrivateRoute({children}: {children: any}) {
  
    const {token} = useSelector(selectCurrentUser);
    
    return token ? children : <Redirect />
};

export default UserPrivateRoute