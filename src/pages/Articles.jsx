import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { API_URL } from '../config'
import postAPI from '../services/postAPI'
import FormComment from '../components/form/FormComment'

import { AiFillCaretLeft } from 'react-icons/ai'
import {
  Skeleton,
  Grid,
  Button,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  List
} from '@mui/material'

const Article = () => {
  const [postState, setPostState] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [comments, setComments] = useState([])
  const { id } = useParams()

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [isLoading])

  const fetchPost = async () => {
    try {
      const data = await postAPI.findOne(id)
      setPostState(data)
      setIsLoading(true)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchComments = async () => {
    try {
      const data = await postAPI.getComments(id)
      setComments(data)
      setIsLoading(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='main-article'>
      <>
        <Link to='/'>
          <Button variant='outlined'>
            <AiFillCaretLeft />
            <span>Retour à l'accueil</span>
          </Button>
        </Link>
      </>
      <h1>
        {isLoading ? (
          postState && postState.title
        ) : (
          <Skeleton variant='text' width={300} height={80} />
        )}
      </h1>
      {isLoading ? (
        postState && (
          <img src={API_URL + postState.image[0].formats.large.url} alt='' />
        )
      ) : (
        <Skeleton variant='rect' width='100%' />
      )}
      <p>
        {isLoading ? (
          postState && postState.content
        ) : (
          <>
            <Skeleton variant='text' width={600} height={30} />
            <Skeleton variant='text' width={600} height={30} />
            <Skeleton variant='text' width={600} height={30} />
            <Skeleton variant='text' width={600} height={30} />
          </>
        )}
      </p>
      <Grid container spacing={2} className='comments'>
        <Grid item md={4}>
          <FormComment fetchComments={fetchComments} id={id} />
        </Grid>
        <Grid item md={12}>
          <List>
            {isLoading &&
              comments.map((comment, i) => (
                <ListItem alignItems='flex-start' key={i}>
                  <ListItemAvatar>
                    <Avatar
                      alt='Remy Sharp'
                      src='/static/images/avatar/1.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.pseudo}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          {comment.content}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </Grid>
      </Grid>
    </div>
  )
}

export default Article
