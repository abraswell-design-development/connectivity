import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import MemberCard from '../../Components/MemberCard/MemberCard'
import { FETCH_USERS_QUERY } from '../../graphql.js/queries'

// import './Home.css'

export default function Members() {
  const { 
    loading, 
    data: { getUsers: users }
  } = useQuery(FETCH_USERS_QUERY)
  return (
    <section className='members-main'>
    <h2 className='members__title'>Group Members</h2>
      <ul>
        {loading ? (
          <h2>Loading members..</h2>
        ) : (
          users &&
          users.map((user) => (
            <li key={user.id}>
                <MemberCard user={user} />
            </li>
          ))
        )}
      </ul>
    </section>
  )
}