import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useClient } from '../../graphql.js/client'
import { CREATE_PHOTO_MUTATION } from '../../graphql.js/mutations'


import { withStyles } from '@material-ui/core/styles'
import {AuthContext} from '../../context/auth'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone'
// import LandscapeIcon from '@material-ui/icons/LandscapeOutlined'

// import SaveIcon from '@material-ui/icons/SaveTwoTone'

const CreatePhoto = ({classes}) => {
  const client = useClient()

  const {dispatch} = useContext(AuthContext)

  const [caption, setCaption] = useState('')
  const [subcaption, setSubcaption] = useState('')
  const [image, setImage] = useState('')
//   const [thumbnail, setThumbnail] = useState('')
  const [folder, setFolder] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleDeleteDraft = () => {
//     dispatch({ type: 'DELETE_DRAFT' })
//   }

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
        caption: caption.trim(),
        subcaption: subcaption.trim(),
        image: imageUrl,
        // thumbnail: thumbnailImageUrl,
        folder: folder.trim()
      }
      console.log(variables)
      // send mutation to create new Pin, grab response
      const { createPhoto } = await client.request(CREATE_PHOTO_MUTATION, variables)
      // add new Pin to 'pins' in state, AND set as 'newPin' in state
      dispatch({ type: 'CREATE_PHOTO', payload: createPhoto })
      // clear draft pin data from state/context
    //   handleDeleteDraft()
    //   console.log('Photo created', { createPhoto })
    } catch (err) {
      // re-enable Submit button
      setIsSubmitting(false)
      console.error('Error creating Photo', err)
    }
  }

  return (
    <form className={classes.form}>
      {/* FORM HEADER */}
      <Typography
        className={classes.alignCenter}
        component="h2"
        variant="h4"
        color="secondary"
      >
        {/* <LandscapeIcon className={classes.iconLarge} /> */}
        Pin Location
      </Typography>

      <div className={classes.inputContainer}>
        {/* PHOTO CAPTION INPUT */}
        <TextField
          autoFocus
          name="caption"
          label="Caption"
          placeholder="Insert Photo caption"
          fullWidth
          onChange={e => setCaption(e.target.value)}
        />
        {/* PHOTO SUBCAPTION INPUT */}
        <TextField
          autoFocus
          name="subcaption"
          label="Subcaption"
          placeholder="Insert Photo subcaption"
          fullWidth
          onChange={e => setSubcaption(e.target.value)}
        />
        {/* PHOTO IMAGE INPUT -- HIDDEN */}
        <input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={e => setImage(e.target.files[0])}
        />
        {/* PHOTO FOLDER INPUT -- HIDDEN */}
        <TextField
          autoFocus
          name="folder"
          label="Folder"
          placeholder="Insert Photo foldername"
          fullWidth
          onChange={e => setFolder(e.target.value)}
        />
        {/* PIN PHOTO INPUT -- ICON BUTTON */}
        <label htmlFor="image">
          <Button
            style={{ color: image && 'green' }}
            component="span"
            size="small"
            className={classes.button}
          >
              add a photo
            {/* <AddAPhotoIcon /> */}
          </Button>
        </label>
      </div>


      {/* BUTTONS */}
      <div className={classes.buttonContainer}>
        {/* SUBMIT */}
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="secondary"
          disabled={ !image || isSubmitting}
          onClick={handleSubmit}
        >
          Submit
          {/* <SaveIcon className={classes.rightIcon} /> */}
        </Button>
      </div>
    </form>
  )
}

const styles = theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: theme.spacing.unit,
    width: '80%',
  },
  contentField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    // margin: '0 auto',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  input: {
    display: 'none',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit,
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    // marginRight: theme.spacing.unit,
    // marginLeft: 0,
  },
})

export default withStyles(styles)(CreatePhoto)