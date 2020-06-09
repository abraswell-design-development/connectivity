import React from 'react'
import moment from 'moment'

import '../PostCard/PostCard.css'



export default function MemberCard({
    user: { id, username, name, email, about, picture, token, createdAt }
}) 

    
{

  const formattedTime = moment(createdAt).calendar()
  
  return (
    <section className='post-card__flex-container'>

      <div className='post-card__thumbnail'>
        {/* TODO Fix Link to Member page */}
        {/* <Link to={`/members/${post.member_id}`}> */}
          <div className='post-card__thumbnail--round'>
            <img 
                src={require(`../../Images/User_Seedy_All.jpg`)} 
                alt='member headshot'
            >
            </img>
          </div>  
        {/* </Link> */}
      </div>
      

      <div className='post-card__info'>
        <h3 className='post-card__title'>
            {name}
        </h3>

        <p className='post-card__body'>
        {email}
        </p>

        <p className='post-card__body'>
        {about}
        </p>

        <p className='post-card__dates'>
        {/* {moment(formattedTime).format('ll')} */}
        Member since: {formattedTime}
        </p>

        </div>
    </section>
  )
}

