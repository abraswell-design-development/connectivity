import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import {AuthContext} from '../../context/auth'
import { useForm } from '../../util/hooks'
import { UPDATE_USER } from '../../graphql.js/mutations'
import Form from '../../util/Form'

import './About.css'



export default function UpdateMemberInfo(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(updateUserCallback, {
    about: '',
    relation: ''
  });

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(
      _,
      {
        data: { update: userData }
      }
    ) {
      context.updateUser(userData)
      console.log('userData: ', userData)
      props.history.push('/')
    },
    onError(err) {
      //setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err)
    },
    variables: values
  });

  function updateUserCallback() {
    updateUser()
  }

  return (
    <section className='about-main'>
      
          <div className='about__form-group'>
            {Object.keys(errors).length > 0 && (
              <div className="Error Message">
                <ul className="Error__list">
                  {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}

            <Form onSubmit={onSubmit} noValidate className={loading ? 'Loading register--loading' : ''}>
              <h3 className='about__form-title'>Update Your Profile</h3>
              <label htmlFor="About">
                <input
                  className='about__form-group'
                  placeholder="About.."
                  name="about"
                  type="text"
                  value='I like birds'
                  // error={errors.about ? 'true' : 'false'}
                  // onChange={onChange}
                />
              </label>
              
              <div className='Button--submit about__button'>
                <button type='submit'>
                  Update
                </button>
              </div>
            </Form>
          </div>
    </section>
  );
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