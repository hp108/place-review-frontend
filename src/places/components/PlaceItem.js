import React from 'react'
import './PlaceItem.css'
import ModalComponent from '../../shared/components/UIElements/ModalComponent';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import TailSpin from '../../shared/components/Loaders/TailSpin';
import ErrorModal from '../../shared/components/Errors/ErrorModal';
import { useRecoilValue } from 'recoil';
import { authState } from '../../shared/recoilState/authState'; 


function PlaceItem(props) {
  const auth = useRecoilValue(authState)
  const token = auth.token
  const {isLoading,isError,sendRequest,clearError}=useHttpClient()
  const pid = props.id
  const uid = auth.userId
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  const clickHandler= ()=>{
    const fun=async()=>{
      try{
          const response = await sendRequest(BACKEND_URL+`/places/${pid}`,"delete",null,{
            'Authorization':'Bearer '+token
          })
          props.onDelete(pid)
      }catch(err){}
    }
    fun()
  }
  return (
    <>
    {isLoading && <TailSpin/>}
    {isError && <ErrorModal error ={isError} clear={clearError} />}
    <li key={props.id} className='place-item' >
      <div className='place-div'>
      <div>
        <div className='place-item-img' >
        <img src={props.url} className='place_img' alt='sorry something went wrong'/>
      </div>
      <div>
        <h1>{props.title}</h1>
        <h3>{props.address}</h3>
        <h4>{props.description}</h4>
      </div>
      </div>
      
      <div className='buttons'>
        <ModalComponent name={'View on Map'} />
        {  props.creatorId === uid &&  <Link to={`/places/${props.id}`} ><button className='btn btn-lg btn-secondary'>Edit</button></Link> }
         {props.creatorId === uid && <button onClick={clickHandler} className='btn btn-lg btn-danger' >Delete</button>}
      </div>
      </div>
    </li>
    </>
  )
}
export default PlaceItem;
