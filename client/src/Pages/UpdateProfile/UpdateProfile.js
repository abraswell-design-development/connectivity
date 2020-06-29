import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {AuthContext} from '../../context/auth'
import { useForm } from '../../util/hooks'
import { UPDATE_USER } from '../../graphql.js/mutations'
import Form from '../../util/Form'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import './UpdateProfile.css'



export default function UpdateProfile(props) {
  const [errors, setErrors] = useState({})

  const { user } = useContext(AuthContext)

  const currentData = user

  let { onChange, onSubmit, values } = useForm(updateUserCallback, {
    email: currentData.email,
    about: '',
    relation: '',
    city: '',
    state: '',
    phone: '',
    picture: '',
    banner: ''
  });

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(
      _,
      {
        data: { update: userData }
      }
    ) {
      props.history.push(`/members/${currentData.id}`)
      console.log('values: ', values)
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function updateUserCallback() {
    updateUser()
  }

  function goBack() {
    props.history.replace('/')
  }

  const infoTab = (
    <div className='about__form-group'>
            {Object.keys(errors).length > 0 && (
              <div className="Error Message error">
                <ul className="Error__list">
                  {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}

            <Form onSubmit={onSubmit} noValidate className={loading ? 'Loading register--loading' : ''}>
              <p className='question'>
                    How do you know the patient? 
              </p>

              <label htmlFor="Relation"/>
              <span><FontAwesomeIcon icon={['fa', 'pencil-alt']} /></span>
              <input
                className='update-answer'
                  placeholder= {currentData.relation}
                name="relation"
                type="text"
                value={values.relation}
                error={errors.relation ? 'true' : 'false'}
                onChange={onChange}
              />

              <p className='question'>
                  What are your hobbies, interests, etc?
              </p>
              
              <label htmlFor="About" />
              <span><FontAwesomeIcon icon={['fa', 'pencil-alt']} /></span>
              <input
                className='update-answer'
                placeholder={currentData.about}
                name="about"
                type="text"
                value={values.about}
                error={errors.about ? 'true' : 'false'}
                onChange={onChange}
              />

              <p className='question'>
                  Where do you currently live?
              </p>
                  
              <div className="update-answer-half__flex-container">
                
                <div className="update-answer-half">
                  <label htmlFor="City"/>
                  <span><FontAwesomeIcon icon={['fa', 'pencil-alt']} /></span>
                  <input
                    className='update-answer'
                    placeholder={currentData.city}
                    name="city"
                    type="text"
                    value={values.city}
                    error={errors.city? 'true': 'false'}
                    onChange={onChange}
                  />

                </div>
                
                <div className="update-answer-half">
                  <label htmlFor="State" />
                  <span><FontAwesomeIcon icon={['fa', 'pencil-alt']} /></span>
                  <input
                    className='update-answer'
                    placeholder={currentData.state}
                    name="state"
                    type="text"
                    value={values.state}
                    error={errors.state? 'true' : 'false'}
                    onChange={onChange}
                  />
                </div>
              </div>

              <p className='question'>
                  Contact Info:
              </p>

              <label htmlFor="Phone" />
              <span><FontAwesomeIcon icon={['fa', 'pencil-alt']} /></span>
              <input
                className='update-answer'
                placeholder={currentData.phone}
                name="phone"
                type="text"
                value={values.phone}
                error={errors.phone? 'true' : 'false'}
                onChange={onChange}
              />

              {/* <label htmlFor="Picture" />
                <input
                  className='about__form-group'
                  placeholder="Picture..."
                  name="picture"
                  type="text"
                  value={values.picture}
                  error={errors.picture ? 'true' : 'false'}
                  onChange={onChange}
                />
              */}
              {/* <label htmlFor="Banner" />
                <input
                  className='about__form-group'
                  placeholder="Banner..."
                  name="banner"
                  type="text"
                  value={values.banner}
                  error={errors.banner ? 'true' : 'false'}
                  onChange={onChange}
                />
                */}
              <div className='Button--submit update__buttons'>
                <button 
                  className='update--button'
                  type='submit'>
                  Update
                </button>
              </div>

              <div className='Button--submit update__buttons'>
                <button 
                  className='update--button'
                  type='cancel'
                  onClick={goBack}
                >
                  Cancel
                </button>
                
              </div>
            </Form>

    </div>
  );

  const displayTabs = (
    <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
        <TabList>
            <Tab>Info</Tab>
        </TabList>
        <TabPanel>{infoTab}</TabPanel>
    </Tabs>
  )

return(
  <section className='update-member-main'>
    <h2 className='update-member__title'>Update Your Profile</h2>

        <div className='single-member-card__banner'>
            <img 
                src={currentData.banner}
                alt='member cover'
            >
            </img>    
        </div>
        <div className='single-member-card__thumbnail--round'>
            <img 
                src={currentData.picture}
                alt='member headshot'
            >
            </img>    
        </div>

    <div className='update-member-card__flex-container'>

        <h2 className='update-member-card__name'>
          {currentData.name}
        </h2>

        {displayTabs}

    </div>
    
      </section>
    )
}










































// import React, { useState, useContext } from 'react'
// import axios from 'axios'
// import { useClient } from '../../graphql/client'
// import { CREATE_PIN_MUTATION } from '../../graphql/mutations'


// import Context from '../../context'





// const CreateProfile = ({ classes }) => {
//   const client = useClient()

//   const { dispatch } = useContext(Context)

//   const [image, setImage] = useState('')
//   const [about, setAbout] = useState('')
//   const [city, setCity] = useState('')
//   const [state, setState] = useState('')
//   const [relationToPatient, setRelationToPatient] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)


//   const handleImageUpload = async () => {
//     const data = new FormData()
//     data.append('file', image)
//     data.append('upload_preset', 'geopins')
//     data.append('cloud_name', 'amy-braswell')

//     const res = await axios.post(
//       'https://api.cloudinary.com/v1_1/amy-braswell/image/upload',
//       data
//     )
//     return res.data.url
//   }

//   const handleSubmit = () => {
//     console.log('submitted about form')
//   }

//   // const handleSubmit = async e => {
//     // try {
//     //   e.preventDefault()
//     //   // update isSubmitting in state (used to disable Submit button)
//     //   setIsSubmitting(true)
//     //   // upload image to Cloudinary and retrieve its URL
//     //   const imageUrl = await handleImageUpload()
//     //   // create GraphQL variables object
//     //   const variables = {
//     //     picture: imageUrl,
//     //   }
//     //   // send mutation to update User, grab response
//     //   const { updateUser } = await client.request(UPDATE_USER_MUTATION, variables)
//     //   // add new Pin to 'pins' in state, AND set as 'newPin' in state
//     //   dispatch({ type: 'UPDATE_USER', payload: updateUser })
//     //   console.log('About Member updated', { updateUser })
//     // } catch (err) {
//     //   // re-enable Submit button
//     //   setIsSubmitting(false)
//     //   console.error('Error creating Pin', err)
//     // }
//   // }

//   return (
//     <form>
//       {/* FORM HEADER */}
//       <h1>
//         Update Profile Information
//       </h1>

//       <div>
//         {/* MEMBER CITY */}
//         <input
//           autoFocus
//           name="city"
//           label="City"
//           placeholder="Current City"
//           fullWidth
//           onChange={e => setCity(e.target.value)}
//         />
//         {/* MEMBER STATE */}
//         <input
//           autoFocus
//           name="state"
//           label="State"
//           placeholder="Current State"
//           fullWidth
//           onChange={e => setState(e.target.value)}
//         />
//         {/* MEMBER ABOUT */}
//         <input
//           autoFocus
//           name="about"
//           label="About"
//           placeholder="Tell us about yourself"
//           fullWidth
//           onChange={e => setAbout(e.target.value)}
//         />
//         {/* MEMBER RELATION */}
//         <input
//           autoFocus
//           name="relation"
//           label="Relation"
//           placeholder="How do you know the patient"
//           fullWidth
//           onChange={e => setRelationToPatient(e.target.value)}
//         />





//         {/* PROFILE PIX INPUT -- HIDDEN */}
//         <input
//           accept="image/*"
//           id="image"
//           type="file"
//           className={classes.input}
//           onChange={e => setImage(e.target.files[0])}
//         />
//         {/* PIN PHOTO INPUT -- ICON BUTTON */}
//         <label htmlFor="image">
//           <button
//             style={{ color: image && 'green' }}
//             component="span"
//             size="small"
//             className={classes.button}
//           >
//             Add Profile Photo
//           </button>
//         </label>
//       </div>



//       {/* BUTTONS */}
//       <div>
//         {/* SUBMIT */}
//         <button
//           type="submit"
//           className={classes.button}
//           variant="contained"
//           color="secondary"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   )
// }




// export default CreateProfile