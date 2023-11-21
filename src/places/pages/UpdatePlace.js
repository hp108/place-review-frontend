import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import './UpdatePlace.css'
import { useHttpClient } from '../../shared/hooks/http-hook'
import TailSpin from '../../shared/components/Loaders/TailSpin'
import ErrorModal from '../../shared/components/Errors/ErrorModal'
import {authState} from '../../shared/recoilState/authState.js'
import { useRecoilValue } from 'recoil'
import './NewPlace.css'


function UpdatePlace() {
    const params = useParams();
    const BACKEND_URL= process.env.REACT_APP_BACKEND_URL
    const {isLoading,isError,sendRequest,clearError} = useHttpClient()
    const pid = params.placeId
    const [updatedPlace,setUpdatedPlace]=useState([])
    const navigate = useNavigate()
    const auth = useRecoilValue(authState)
    const uid = auth.userId
    const token = auth.token
    useEffect(()=>{ 
      const fun=async()=>{
        try{
          const response = await sendRequest(BACKEND_URL+`/places/${pid}`)
          setUpdatedPlace(response.data.place)
        }
        catch(err){}
      }
      fun()
    },[sendRequest,pid])

    const submitHandler= async(e)=>{
      e.preventDefault();
          try{
            await sendRequest(BACKEND_URL+`/places/${pid}`,"patch",{
              title:e.target[0].value,
              description:e.target[1].value
            },
            {
              'Authorization':'Bearer '+token,
            }
            )
          }
          catch(err){}
          navigate(`/${uid}/places`)
    }

  return (
    <div>
      {isLoading && <TailSpin/>}
      {isError && <ErrorModal error={isError} clear={clearError}/>}
        {updatedPlace &&
        <form className="form form__update" onSubmit={submitHandler}  >
        <div  className="form-div" >
        <div className="form-div" >
          <div>
            <label htmlFor="label1">Title</label>
          </div>
          <div>
            <input defaultValue={updatedPlace.title} className="form-control" id="label1" />
          </div>
        </div>
        <div className="form-div" >
          <div>
            <label htmlFor="label2">Description</label>
          </div>
          <div>
            <textarea rows={2} defaultValue={updatedPlace.description} className="form-control" id="label2" />
          </div>
        </div>
        <Button type="submit" className="btn">Update Place</Button>
        </div>
      </form>}
      {!updatedPlace && <p className='error'>no place found</p>}
    </div>
  )
}

export default UpdatePlace
