import React, { useState, useContext } from 'react'
import { useClient } from '../../graphql.js/client'
import axios from 'axios'

import { CREATE_PHOTO_MUTATION } from '../../graphql.js/mutations'
//import { FETCH_FOLDERS_QUERY } from '../../graphql.js/queries'
import Form from '../../util/Form'

import '../PostForm/PostForm.css'



export default function PhotoForm() {
  const client = useClient()

  const [image, setImage] = useState('')
  const [folder, setFolder] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleImageUpload = async () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'geopins')
    data.append('cloud_name', 'amy-braswell')

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/amy-braswell/image/upload',
      data
    )
    return res.data.url
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      // update isSubmitting in state (used to disable Submit button)
      setIsSubmitting(true)
      // upload image to Cloudinary and retrieve its URL
      const imageUrl = await handleImageUpload()
      // create GraphQL variables object
      const variables = {
        image: imageUrl,
        folder: folder.trim()
      }
      console.log(variables)
      // send mutation to create new Photo, grab response
      const { createPhoto } = await client.request(CREATE_PHOTO_MUTATION, variables)
      console.log('client request: ', client.request)
      debugger

      // add new Photo to 'photos' in state, AND set as 'newPhoto' in state
      // dispatch({ type: 'CREATE_PHOTO', payload: createPhoto })
      debugger
      console.log('Photo created', { createPhoto })
    } catch (err) {
      // re-enable Submit button
      setIsSubmitting(false)
      console.error('Error creating Photo', err)
    }
  }
  
  return (
    <section className='add-post__form'>
      <Form>
        <h3 className='add-photo__title'>Create a photo:</h3>

        <div className='add-photo__flex-container'>
          <div className='add-photo__form-group'>
            <label htmlFor="photo-content">        
            <input
              className='new-photo__image'
              accept="image/*"
              id="image"
              type="file"
              onChange={e => setImage(e.target.files[0])}
            />
            </label>
          </div>

          <div className='add-photo__form-group'>
            <label htmlFor="photo-folder">        
              <textarea
                className='new-photo__folder'
                id='photo-folder-input'
                placeholder="Folder ID"
                name="folder"
                onChange={e => setFolder(e.target.value)}
              />
            </label>
          </div>

          <div className='Button--submit add-post__button'>
            <button 
              type='submit' 
              onClick={handleSubmit}
              disabled={!image || !folder.trim() || isSubmitting}
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </section>
  );
}
