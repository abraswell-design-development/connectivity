import React from 'react'
import { Link } from 'react-router-dom'
import './MemberCard.css'



export default function MemberCard({
    user: { id, name, city, state, picture }
}) 
    
{return (
    <section className='member-card__flex-container'>

      <div className='member-card__thumbnail'>
        {/* TODO Fix Link to Member page */}
        <Link to={`/members/${id}`}>
          <div className='member-card__thumbnail--round'>
            <img 
                src={picture}
                alt='member headshot'
            >
            </img>
          </div>  
        </Link>
      </div>
      
      <div className='member-card__info'>
      <Link to={`/members/${id}`}>
        <h3 className='member-card__title'>
            {name}
        </h3>
      </Link>
        { city ? 
          (<p className='member-card__location'>
              {city}, {state}
            </p>
          ) 
          : 
          ('')
        }
      </div>
      
    </section>
  )
}