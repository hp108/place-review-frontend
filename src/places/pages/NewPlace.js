import './NewPlace.css'
import {Button, Form} from 'react-bootstrap'
import React, { useRef, useState } from 'react'
import TailSpin from '../../shared/components/Loaders/TailSpin'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { useRecoilValue } from 'recoil'
import { authState } from '../../shared/recoilState/authState'
import ErrorModal from '../../shared/components/Errors/ErrorModal'
import { useNavigate } from 'react-router-dom'


function NewPlace() {
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  const {isError,isLoading,sendRequest,clearError} = useHttpClient()
  const auth = useRecoilValue(authState)
  const uid = auth.userId
  const ref = useRef()
  const [avatar,setAvatar]= useState(null)
  const token = auth.token
  const changeHandler = (e)=>{
    setAvatar(e.target.files[0])
    }

  const submitHandler = async(e)=>{
    e.preventDefault()
    const place = new FormData();
    place.append('title', e.target[0].value);
    place.append('description', e.target[1].value);
    place.append('address', e.target[2].value);
    place.append('creatorId', uid);
    place.append('image', avatar);
    try{
      const response = await sendRequest(BACKEND_URL+"/places/","post",place,{'authorization':'bearer '+token})
      if(response)
      {
        navigate(`/${uid}/places`)
      }
    }
    catch(err){}
  }
  const imageHandler = (e)=>{
    e.preventDefault()
    ref.current.click()
  }

  return (
      <div className='ttt' >
        {isLoading && <TailSpin/>}
        {isError && <ErrorModal error = {isError} clear= {clearError}  />}
      <form onSubmit={submitHandler} className="form" >
        <div  className="form_div" >
        <div className="form-div">
          <div>
            <label htmlFor="label1">Title</label>
          </div>
          <div>
            <input className="form-control" id="label1" />
          </div>
        </div>
        <div className="form-div" >
          <div>
            <label htmlFor="label2">Description</label>
          </div>
          <div>
            <textarea rows={4} className="form-control" id="label2" />
          </div>
        </div>
        <div className="form-div">
          <div>
            <label htmlFor="label3">Address</label>
          </div>
          <div>
            <input className="form-control" id="label3" />
          </div>
        </div> 
        <div>
          <input ref={ref} type='file'style={{display:'none'}}  onChange={changeHandler}  />
          <div className='img'>
          {avatar && <img className='img' src={avatar?URL.createObjectURL(avatar):""} alt='Preview'  /> }
          {!avatar && <p className='preview' >Preview</p>}
          </div>
          <button onClick={imageHandler}>Add Image</button>
        </div>
        <div >
        <Button className="btn new_place__button " type='submit'>Submit</Button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default NewPlace
