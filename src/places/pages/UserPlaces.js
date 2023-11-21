import React, { useEffect, useState } from 'react'
import PlaceList from '../components/PlaceList'
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import TailSpin from '../../shared/components/Loaders/TailSpin'
import ErrorModal from '../../shared/components/Errors/ErrorModal'
import { useRecoilValue } from 'recoil'
import { authState } from '../../shared/recoilState/authState'

function UserPlaces() {
    const params = useParams()
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
    const { isLoading,isError,sendRequest,clearError } = useHttpClient()
    const uid = params.userId
    const auth = useRecoilValue(authState)
    const token = auth.token
    const [places,setPlaces] = useState([])
    const onDelete=(pid)=>{
      setPlaces(places => places.filter(place => place.id !== pid))
    }
    useEffect(()=>{
        const fun=async()=>{
          try{  
              const response = await sendRequest(BACKEND_URL+`/places/user/${uid}`)
                setPlaces(response.data)
          }catch(err){}
        } 
        fun()
    },[sendRequest,uid])
  return (
    <div>
      {isLoading && <TailSpin/>}
      {isError && <ErrorModal error ={isError} clear ={clearError} />}
      {!isError && <PlaceList places={places} onDelete={onDelete} />}
    </div>
  )
}

export default UserPlaces;
