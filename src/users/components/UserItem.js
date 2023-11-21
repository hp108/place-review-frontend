import React from 'react'
import Avatar from '../../shared/components/UIElements/Avatar'
import './UserItem.css'
import { Link } from 'react-router-dom'

function UserItem(props) {
  return (
    <>
        <li className='user-item'>
            <div>
                <Link to={`/${props.id}/places`} className='user-item__content' >
                <div >
                    <Avatar image ={props.image}  alt={props.name} />
                </div>
                <div className='user-item__info'>
                    <h2>
                        {props.name}
                    </h2>
                    <h3>
                        {props.placeCount} {props.placeCount===1? 'place':'places'}
                    </h3>
                </div>
                </Link>
          </div>
        </li>     
    </>
  )
}

export default UserItem
