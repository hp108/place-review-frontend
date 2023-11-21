import React, { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import { useHttpClient } from '../../shared/hooks/http-hook'
import TailSpin from '../../shared/components/Loaders/TailSpin';
import ErrorModal from '../../shared/components/Errors/ErrorModal';
function Users() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  const { isLoading,isError,sendRequest,clearError } = useHttpClient();
  const [users,setUsers]= useState([])
  useEffect(()=>{
    const fun = async()=>{
    try{  
       const response = await sendRequest(BACKEND_URL+'/users/');
       setUsers(response.data.users)
    }catch(err){}
  }
  fun()
  },[sendRequest])

  return (
    <div>
      {isLoading && <TailSpin/>}
      {isError  && <ErrorModal error={isError} clear={clearError}/>}
      <UsersList users={users} />
    </div>
  )
}

export default Users
