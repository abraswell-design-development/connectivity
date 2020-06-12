import React, { useContext, useState, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import moment from 'moment'

import {AuthContext} from '../../context/auth'
import CommentButton from '../../Components/CommentButton/CommentButton'
import DeleteButton from '../../Components/DeleteButton/DeleteButton'
import LikeButton from '../../Components/LikeButton/LikeButton'
import { FETCH_POST_QUERY } from '../../graphql.js/queries'
import { SUBMIT_COMMENT_MUTATION } from '../../graphql.js/mutations'

import './SinglePost.css'



function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const {
    data: { getPost }
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      name,
      picture,
      comments,
      likes,
      likeCount,
      commentCount
    } = getPost;

    postMarkup = (
      <section className='single-post-main'>
        <h2 className='single-post__title'>Public Post</h2> 
        
        <div className='post-card__flex-container'>
          
          <div className='post-card__thumbnail'>
            <div className='post-card__thumbnail--round'>
              <img 
                src={picture}
                alt='member headshot'
              >
              </img>    
            </div>
          </div>

          <div className='post-card__info'>
            <h3 className='post-card__title'>
              <Link to={`/postId/${id}`}>
                {name}
              </Link>
            </h3>
            <div className='post-card__dates'>
              <div className='Item__dates-created_at'>
                <Link to={`/posts/${id}`}>
                <span className='Date'>
                  {moment(createdAt).fromNow(true)}
                </span>
                </Link>
              </div>
            </div> 
            <p className='post-card__body'>{body}</p>
            <hr />
            <div className='post-card__button-container__flex-container'>
              <div className='other-buttons__container'>
                <LikeButton 
                  user={username} 
                  post={{ id, likeCount, likes }} 
                />
                <CommentButton 
                  post={{ id, commentCount }} 
                /> 
              </div>

              <div className='delete-button__container'>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </div>
            </div>
          </div>
        </div>
 
              {user && (
                <div className='Add__Comment'>
                  <h3 className='ItemPageMainTitle'>Share Public Comment</h3>
                  
                  <div className='field form-group'>
                    <textarea
                      type="text"
                      placeholder="Comment.."
                      name="comment"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      ref={commentInputRef}
                    />
                  </div>

                  <div className='buttons'>
                    <button
                      type="submit"
                      className="ui button teal"
                      disabled={comment.trim() === ''}
                      onClick={submitComment}
                    >
                      Submit
                    </button>
                  </div>

                </div>
              )}



        
          <div className='ItemPageMain__activity'>
            <ul className='ItemPageMain__Activity__List'>
              {comments.map((comment) => (
                <li key={comment.id}>

                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <h3 className='Item__title'>{comment.username}</h3>
                  <div className='Item__dates'>
                    <div className='Item__dates-created_at'>
                      <span className='Date'>
                        {moment(comment.createdAt).fromNow()}
                      </span> 
                    </div>
                  </div> 
                  <p className='Item__content'>{comment.body}</p>

                </li>
              ))}
              </ul>
          </div>
          
      </section>
    )
  }
  return postMarkup;
}





export default SinglePost;