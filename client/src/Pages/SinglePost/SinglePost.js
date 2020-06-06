import React, { useContext, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Context } from '../../context/auth'
import DeleteButton from '../../Components/DeleteButton/DeleteButton'
import LikeButton from '../../Components/LikeButton/LikeButton'
import { FETCH_POST_QUERY } from '../../graphql/queries'
import { SUBMIT_COMMENT_MUTATION } from '../../graphql/mutations'



// fake comment for commit
function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(Context);
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
      comments,
      likes,
      likeCount,
      commentCount
    } = getPost;

    postMarkup = (
      <section className='ItemPageMain'>
        <h2 className='ItemPageMainTitle'>Public Post from {username}</h2> 
        
        <div className='ListPage__Row__Item__FlexContainer'>
          
          <div className='ItemPage__img__container'>
            <div className='ItemPage__img__container'>
              <img 
                src={require(`../../Images/User_Seedy_All.jpg`)} 
                alt='member headshot'
              >
              </img>    
            </div>
          </div>

          <div className='ItemPage__info__container'>
            <h3 className='Item__title'>
              <Link to={`/postId/${id}`}>
                {username}
              </Link>
            </h3>
            <div className='Item__dates'>
              <div className='Item__dates-created_at'>
                <Link to={`/posts/${id}`}>
                <span className='Date'>
                  {moment(createdAt).fromNow(true)}
                </span>
                </Link>
              </div>
            </div> 
            <p className='Item__content'>{body}</p>
            <hr />
            <div className='Item__button__container'>
              <LikeButton user={user} post={{ id, likeCount, likes }} />
              {/* <PopUp content="Comment on post"> */}
                <Link to={`/posts/${id}`}> 
                  <button
                    className='Item__comment'
                    type='button'
                  >
                    <span>
                    <FontAwesomeIcon icon={['fas', 'comment']} />
                    </span>
                    <span>
                      {commentCount}
                    </span>
                  </button>
                </Link>
              {/* </PopUp>  */}
              {user && user.username === username && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
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