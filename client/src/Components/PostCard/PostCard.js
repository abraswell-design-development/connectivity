import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import {AuthContext} from '../../context/auth'
import CommentButton from '../CommentButton/CommentButton'
import DeleteButton from '../DeleteButton/DeleteButton'
import LikeButton from '../LikeButton/LikeButton'
import Tooltip from '../Tooltip/Tooltip'

import './PostCard.css'



export default function PostCard({
  post: { body, createdAt, id, username, name, picture, relation, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext)

  const formattedTime = moment(createdAt).fromNow()

  return (
    <section className='post-card__flex-container'>

      <div className='post-card__thumbnail'>
        <Link to={`/members/${id}`}>
          <Tooltip  left='-15px'
              message={relation}>
            <div className='post-card__thumbnail--round'>

              <img 
                  src={picture}
                  alt='member headshot'
              >
              </img>
            </div>  
          </Tooltip>
        </Link>
      </div>
     
      <div className='post-card__info'>
          <h3 className='post-card__title'>
            <Link to={`/posts/${id}`}>
             {name}
            </Link>
          </h3>

          <Link to={`/posts/${id}`}>
            <span className='post-card__dates'>
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

