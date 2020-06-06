import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Context } from '../../context/auth'
import CommentButton from '../CommentButton/CommentButton'
import DeleteButton from '../DeleteButton/DeleteButton'
import LikeButton from '../LikeButton/LikeButton'

import './PostCard.css'



export default function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(Context)

  const formattedTime = moment(createdAt).calendar()

  return (
    <section className='post-card__flex-container'>

      <div className='post-card__thumbnail'>
        
        <Link to={`/members/${user.id}`}>
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
          <h3 className='post-card__title'>
            {/* TODO - Change to member id? */}
            <Link to={`/posts/${id}`}>
             {username}
            </Link>
          </h3>

          <Link to={`/posts/${id}`}>
            <span className='post-card__dates'>
            {/* {moment(formattedTime).format('ll')} */}
            {formattedTime}
            </span>
          </Link>

          <p className='post-card__body'>
          {body}
          </p>

          <div className='post-card__button-container__flex-container'>
            <div className='other-buttons__container'>
              <LikeButton 
                user={user} 
                post={{ id, likes, likeCount }} 
              />  
              <CommentButton 
                post={{ id, commentCount }} 
              /> 
            </div>

            <div className='delete-button__container'>
              {user && user.username === username && <DeleteButton postId={id} />}
            </div>
          </div>

        </div>
    </section>
  )
}

