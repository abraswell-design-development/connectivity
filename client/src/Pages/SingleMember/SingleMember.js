import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PostCard from '../../Components/PostCard/PostCard'

import { FETCH_USER_QUERY } from '../../graphql.js/queries'
import { FETCH_POSTS_QUERY } from '../../graphql.js/queries'

import './SingleMember.css'




export default function SingleMember(props) {

    const userId = props.match.params.memberId;

    const { 
        data: { getPosts: posts }
    } = useQuery(FETCH_POSTS_QUERY)

    console.log(posts)


    const {
        data: { getUser }
    } = useQuery(FETCH_USER_QUERY, {
        variables: {
        userId
        }
    })

    const countPostsForMember = (posts=[], member_id) =>
        posts.filter(post => post.member_id === parseInt(member_id)).length

    const getPostsFromMember = (posts = [], member_id) => {
        const filteredPosts = !member_id
        ? posts
        : posts.filter((post) => post.member_id === parseInt(member_id))
    
        return [...filteredPosts].sort((a, b) => {
        return +b.id - +a.id;
        })
    }


  let userMarkup;
  if (!getUser) {
    userMarkup = <p>Loading user..</p>;
  } else {
    const {
        id,
        username,
        name,
        city,
        state,
        about,
        relation,
        email,
        picture,
        createdAt
    } = getUser;

    userMarkup = (
      <section className='single-post-main'>
        <h2 className='single-post__title'>More about {username}...</h2> 
        
        <div className='single-post-card__flex-container'>
          
            <div className='single-post-card__thumbnail'>
                <div className='single-post-card__thumbnail--round'>
                <img 
                    src={picture}
                    alt='member headshot'
                >
                </img>    
                </div>
            </div>

          <div className='single-post-card__info'>
            <h3 className='single-post-card__title'>
              <Link to={`/postId/${id}`}>
                {username}
              </Link>
            </h3>

            <h3 className='single-post-card__title'>
              <Link to={`/postId/${id}`}>
                {name}
              </Link>
            </h3>

            <h3 className='single-post-card__title'>
              <Link to={`/postId/${id}`}>
                {city},{state}
              </Link>
            </h3>

            <h3 className='single-post-card__title'>
              <Link to={`/postId/${id}`}>
                {about}
              </Link>
            </h3>

            <h3 className='single-post-card__title'>
              <Link to={`/postId/${id}`}>
                {relation}
              </Link>
            </h3>

            <h3 className='single-post-card__title'>
              <Link to={`/postId/${id}`}>
                {email}
              </Link>
            </h3>

            <h3 className='single-post-card__title'>
              <Link to={`/postId/${id}`}>
                <span className='Date'>
                    {moment(createdAt).fromNow()}
                </span> 
              </Link>
            </h3>

          </div>
        </div>
 
            
        <div className='ItemPageMain__activity__section'>
            <h3 className='ItemPageMain__section__title'>
            Public Posts From This Member:
            {' '}{countPostsForMember(posts, id)}
            </h3>
            {/* <ul className='ItemPageMain__Activity__List'>
                {getPostsFromMember.map(post =>
                <li key={post.id} className='Item__in__activity__list'>
                    <div className='Item__in__activity__list__FlexItem__Info'>
                        <PostCard post={post} />
                    </div>
                </li>
                )}
            </ul> */}
        </div>
        
      </section>
    )
  }
  return userMarkup;
}





