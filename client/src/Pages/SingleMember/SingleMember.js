import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { FETCH_USER_QUERY } from '../../graphql.js/queries'
import { FETCH_POSTS_QUERY } from '../../graphql.js/queries'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PostCard from '../../Components/PostCard/PostCard'
import 'react-tabs/style/react-tabs.css'
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

    const countPostsForMember = (posts) => {
        const filteredPosts = []
        posts.map((post) => (
            post.name  === name ?  filteredPosts.push(post) : ''
        ))
        const countedPosts = (filteredPosts.length)
        return(countedPosts)
    }

    const getPostsFromMember = (posts) => {
        const filteredPosts = []
        posts.map((post) => (
            post.name  === name ?  filteredPosts.push(post) : ''
        ))
        const sortedPosts = (filteredPosts)
        return(sortedPosts)
    }


    const displayTabs = (
        <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
            <TabList>
                <Tab>Info</Tab>
                <Tab>Posts</Tab>
            </TabList>
            <TabPanel>Info variable should go here</TabPanel>
            <TabPanel>Recent Posts variable should go here</TabPanel>
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

            {/* THIS NEEDS TO GO IN A VARIABLE FOR INFO TAB */}
            <div className='single-member-card__info'>

                {relation && (<p className='single-member-card__relation question'>
                    How do you know the patient? 
                </p>)}
                <p className='single-member-card__relation answer'>
                    {relation}
                </p>

               {about && (
                <p className='single-member-card__about question'>
                    What are your hobbies, interests, etc?
                </p>)}
                <p className='single-member-card__about answer'>
                    {about}
                </p>
                
                {state && (
                <p className='single-member-card__location question'>
                    Where do you currently live?
                </p>)}
                {state && (<p className='single-member-card__location answer'>
                    {city}, {state}
                </p>)}

                {email && (<p className='single-member-card__location question'>
                    Contact Info:
                </p>)}
                <p className='single-member-card__title answer'>
                    {phone}
                </p>
                <p className='single-member-card__title answer'>
                    {email}
                </p>

            </div>
            {/* END */}


            
            {/* THIS NEEDS TO GO IN A VARIABLE FOR POST TAB */}
            <div className='member__activity__section'>
                <h3 className='member__activity__section__title'>
                    Recent Posts:
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
            {/* END */}

        </div>
        
      </section>
    )
  }
  return userMarkup;
}





