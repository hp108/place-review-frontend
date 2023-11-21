import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { loginHandler } from './shared/recoilState/authState'


function App(props) {
  const userData= props.userData

  const [login,loginFun]=useRecoilState(loginHandler)

  useEffect(()=>{
    try{
    if(userData)
    {
      loginFun({userId:userData.userId,token:userData.token})
    }
  }
  catch(err)
  {
    console.log(err.message)
  }
  },[loginFun])
  
  

  return (
    <></>
  )
}

export default App
