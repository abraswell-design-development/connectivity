import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'

import {Context} from '../../context/auth'
import PostCard from '../../Components/PostCard/PostCard'
import PostForm from '../../Components/PostForm/PostForm'
import { FETCH_POSTS_QUERY } from '../../graphql.js/queries'

import './Home.css'

export default function Home() {
  const { user } = useContext(Context)
  const { 
    loading, 
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY)
  console.log(posts)
  return (
    <section className='home-main'>
    <h2 className='home__title'>Public Posts</h2>
      <ul>
      {user && (
            <PostForm />
        )}
        {loading ? (
          <h2>Loading posts..</h2>
        ) : (
          posts &&
          posts.map((post) => (
            <li key={post.id}>
                <PostCard post={post} />
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

