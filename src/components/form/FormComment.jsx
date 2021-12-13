import { TextField, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import commentsAPI from '../../services/commentsAPI'

const FormComment = ({ fetchComments, id }) => {
  const [comment, setComment] = useState({})

  const handleSubmit = e => {
    e.preventDefault()
    try {
      commentsAPI.create(comment)
      setComment('')
      fetchComments()
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget

    setComment({
      ...comment,
      post: id,
      [name]: value
    })
  }

  useEffect(() => {}, [comment])

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id='pseudo'
        label='Pseudo'
        type='text'
        onChange={handleChange}
        name='pseudo'
        value={comment.pseudo || ''}
      />
      <TextField
        id='standard-multiline-static'
        label='Écrire un commentaire'
        multiline
        rows={6}
        variant='standard'
        onChange={handleChange}
        name='content'
        value={comment.content || ''}
      />
      <Button variant='contained' endIcon={<AiOutlineSend />} type='submit'>
        Envoyer
      </Button>
    </form>
  )
}

export default FormComment
