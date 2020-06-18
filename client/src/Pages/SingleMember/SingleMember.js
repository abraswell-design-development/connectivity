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
        name,
        city,
        state,
        about,
        relation,
        email,
        picture
    } = getUser;

    const countPostsForMember = (posts) => {
        const filteredPosts = []
        posts.map((post) => (
            post.name || post.profileObj.name      === name ?  filteredPosts.push(post) : ''
        ))
        const countedPosts = (filteredPosts.length)
        return(countedPosts)
    }

    const getPostsFromMember = (posts) => {
        const filteredPosts = []
        posts.map((post) => (
            post.name || post.profileObj.name   === name ?  filteredPosts.push(post) : ''
        ))
        const sortedPosts = (filteredPosts)
        return(sortedPosts)
    }

    userMarkup = (
      <section className='single-member-main'>
        <h2 className='single-member__title'>More about {name}...</h2> 
        
        <div className='single-member-card__flex-container'>
          
            <div className='single-member-card__thumbnail'>
                <div className='single-member-card__thumbnail--round'>
                    <img 
                        src={picture}
                        alt='member headshot'
                    >
                    </img>    
                </div>
            </div>

            <div className='single-member-card__info'>
                <h3 className='single-member-card__title'>
                    <Link to={`/postId/${id}`}>
                        {name}
                        {city && (<span className='single-member-card__location'> &nbsp;currently lives in {city}, {state}
                        </span>)}
                    </Link>
                </h3>

                <p className='single-member-card__title'>
                    How do you know the patient? <br></br>
                    {relation}
                </p>

                <p className='single-member-card__title'>
                    hobbies, interests, etc...  {about}
                </p>

                <p className='single-member-card__title'>
                    {email}
                </p>
            </div>
        </div>
            
        <div className='member__activity__section'>
            <h3 className='member__activity__section__title'>
                Public Posts From This Member:
                {' '}{countPostsForMember(posts)}
            </h3>
            <ul className='filtered-post-list'>
                {getPostsFromMember(posts).map(post =>
                <li key={post.id} className='filtered-post-in-list__flex-container'>
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





