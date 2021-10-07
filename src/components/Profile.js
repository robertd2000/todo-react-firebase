import React, { useState } from 'react'

import { getAuth, updateProfile, updatePassword } from 'firebase/auth'
import { Container, Grid } from '@material-ui/core'

import { useInput } from '../hooks/useInput'
import ProfileCard from './ProfileCard'
import ProfileInput from './ProfileInput'
import Loader from './Loader'
import PasswordChange from './PasswordChange'

const Profile = () => {
  const auth = getAuth()
  const user = auth.currentUser
  const displayName = user?.displayName
  const email = user?.email
  const photoURL = user?.photoURL
  const creationTime = user?.creationTime
  const uid = user?.uid

  console.log(user)
  const [profileState, setProfiletate] = useState({
    displayName,
    email,
    photoURL,
    creationTime,
  })

  const [photoState, setPhotoState] = useState(photoURL)
  const [loading, setLoading] = useState(false)

  console.log(photoState)
  const newName = useInput(displayName)

  const onUpdateProfile = () => {
    setLoading(true)
    updateProfile(auth.currentUser, {
      displayName: newName.value,
      photoURL: photoState,
    })
      .then(() => {
        setProfiletate({
          ...profileState,
          displayName: newName.value,
          photoURL: photoState,
        })
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  console.log(photoURL)

  const onEditMode = (editMode, setEditMode, handler) => {
    if (!editMode) {
      setEditMode(true)
      console.log(editMode)
    } else {
      handler()
      setEditMode(false)
    }
  }

  const passwordChange = (newPassword) => {
    updatePassword(user, newPassword).catch((error) => {
      console.log(error)
    })
  }

  function imgToBase64(img) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height

    // I think this won't work inside the function from the console
    img.crossOrigin = 'anonymous'

    ctx.drawImage(img, 0, 0)

    return canvas.toDataURL()
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      // var reader = new FileReader()
      // console.log('next')

      // let base64String = ''
      // reader.onload = function () {
      //   base64String = reader.result.replace('data:', '').replace(/^.+,/, '')

      //   // alert(imageBase64Stringsep);
      //   console.log(base64String)
      // }
      // reader.readAsDataURL(img)

      const imgFile = new Image()
      img.src = img
      console.log(imgFile)
      //   const formData = new FormData()
      //   formData.append('image', img, img.name)
      //   let reader = new FileReader()
      //   reader.readAsText(img)
      // setPhotoState(URL.createObjectURL(img))
      setPhotoState(imgFile)
    }
  }

  const isInvalid = newName.value === ''

  const { displayName: name, photoURL: photo } = profileState

  if (loading) {
    return <Loader />
  }

  return (
    <Container>
      <Grid
        className={`fade-out`}
        container
        style={{
          padding: '20px',
          margin: '20px',
        }}
      >
        <Grid item xs={5}>
          <ProfileInput
            onImageChange={onImageChange}
            isInvalid={isInvalid}
            newName={newName}
            onEditMode={onEditMode}
            updateProfile={onUpdateProfile}
          />
          <PasswordChange
            passwordChange={passwordChange}
            onEditMode={onEditMode}
          />
        </Grid>

        <Grid item xs={7}>
          <ProfileCard name={name} email={email} photo={photo} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile
