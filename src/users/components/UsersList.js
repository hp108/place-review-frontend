import React from 'react'
import UserItem from './UserItem';
import './UsersList.css'

function UsersList(props) {  
        if(props.users.length === 0)
        {
            return (
                <div className='center' >no data found</div>
            );
        }
        return (
            <ul className='users-list'>
                {props.users.map(user => <UserItem key={user.id} id={user.id} image ={user.image} name={user.name.split(' ')[0]} placeCount = {user.places.length} />)}
            </ul>
        )
}

export default UsersList;
