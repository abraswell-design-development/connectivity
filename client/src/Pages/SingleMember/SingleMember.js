import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { FETCH_USER_QUERY } from '../../graphql.js/queries'
import { FETCH_POSTS_QUERY } from '../../graphql.js/queries'
import PostCard from '../../Components/PostCard/PostCard'

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
        picture
    } = getUser;

    console.log(name)

    const countPostsForMember = (posts) => {
        const filteredPosts = []
    
        posts.map((post) => (
            post.name === name ?  filteredPosts.push(post) : ''
        ))
      
        const countedPosts = (filteredPosts.length)
        console.log('countedPosts: ', countedPosts)
        return(countedPosts)
    }

    const getPostsFromMember = (posts) => {
        const filteredPosts = []
    
        posts.map((post) => (
            post.name === name ?  filteredPosts.push(post) : ''
        ))
      
        const sortedPosts = (filteredPosts)
        return(sortedPosts)
    }

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
                        {name}
                    </Link>
                </h3>
                <h3 className='single-post-card__title'>
                    {city && <Link to={`/postId/${id}`}>{city}, {state}</Link>}
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
            </div>
        </div>
            
        <div className='ItemPageMain__activity__section'>
            <h3 className='ItemPageMain__section__title'>
                Public Posts From This Member:
                {' '}{countPostsForMember(posts)}
            </h3>
            <ul className='ItemPageMain__Activity__List'>
                {getPostsFromMember(posts).map(post =>
                <li key={post.id} className='Item__in__activity__list'>
                    <div className='Item__in__activity__list__FlexItem__Info'>
                        <PostCard post={post} />
                    </div>
                </li>
                )}
            </ul>
        </div>
        
      </section>
    )
  }
  return userMarkup;
}





