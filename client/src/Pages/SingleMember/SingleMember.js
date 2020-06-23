import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { FETCH_USER_QUERY } from '../../graphql.js/queries'
import { FETCH_POSTS_QUERY } from '../../graphql.js/queries'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
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
            name,
            city,
            state,
            about,
            relation,
            email,
            phone,
            banner,
            picture
        } = getUser;

    const getPostsFromMember = (posts) => {
        const filteredPosts = []
        posts.map((post) => (
            post.name  === name ?  filteredPosts.push(post) : ''
        ))
        // TODO - FIGURE OUT DYNAMIC WAY TO GET 5 BUT MAYBE POP INSTEAD OF
        const sortedPosts = (filteredPosts).slice(0,5)
        return(sortedPosts)
    }

    const infoTab = (
        <div className='single-member-card__info'>
    
            {relation && (
            <>
                <p className='question'>
                    How do you know the patient? 
                </p>
                <p className='answer'>
                    {relation}
                </p>
            </>
            )}

            {about && (
            <>
                <p className='question'>
                    What are your hobbies, interests, etc?
                </p>
                <p className='answer'>
                    {about}
                </p>
            </>
            )}
            
            {state && (
            <>
                <p className='question'>
                    Where do you currently live?
                </p>
                <p className='answer'>
                    {city}, {state}
                </p>
            </>
            )}

            {email && (
            <>
                <p className='question'>
                    Contact Info:
                </p>
                {phone &&(<p className='answer'>
                    {phone}
                </p>)}
                {email && (<p className='answer'>
                    {email}
                </p>)}
            </>
            )}

        </div>
    );


    const postsTab = (
        <div className='member__activity__section'>
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
    )

    const displayTabs = (
        <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
            <TabList>
                <Tab>Info</Tab>
                <Tab>Recent Posts</Tab>
                <Tab>Photos</Tab>
            </TabList>
            <TabPanel>{infoTab}</TabPanel>
            <TabPanel>{postsTab}</TabPanel>
            <TabPanel>Photos Will Go Here</TabPanel>
        </Tabs>
    )

    function goBack() {
        props.history.replace('/members')
      }

    userMarkup = (
      <section className='single-member-main'>
        <h2 className='single-member__title'>{name}</h2>

        <button 
            className = "Button--back"
            onClick = {goBack}
        >
            Back
        </button>

        <div className='single-member-card__profile-pix'>
            {banner && (<div className='single-member-card__banner'>
                <img 
                    src={banner}
                    alt='member headshot'
                >
                </img>    
            </div>)}
            {picture && (<div className='single-member-card__thumbnail--round'>
                <img 
                    src={picture}
                    alt='member headshot'
                >
                </img>    
            </div>)}
        </div>

        <div className='single-member-card__flex-container'>

            <h2 className='single-member-card__name'>
                {name}
            </h2>

            {displayTabs}

        </div>
        
      </section>
    )
  }
  return userMarkup;
}





