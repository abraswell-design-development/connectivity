import React from 'react'
import { Link } from 'react-router-dom'
import '../PostCard/PostCard.css'



export default function MemberCard({
    user: { id, name, city, state, picture }
}) 
    
{return (
    <section className='post-card__flex-container'>

      <div className='post-card__thumbnail'>
        {/* TODO Fix Link to Member page */}
        <Link to={`/members/${id}`}>
          <div className='post-card__thumbnail--round'>
            <img 
                src={require(`../../Images/User_Seedy_All.jpg`)} 
                alt='member headshot'
            >
            </img>
          </div>  
        </Link>
      </div>
      

        <div className='post-card__info'>
        <Link to={`/members/${id}`}>
          <h3 className='post-card__title'>
              {name}
          </h3>
        </Link>
          <p className='post-card__body'>
          {city}, {state}
          </p>
        </div>
      
    </section>
  )
}

