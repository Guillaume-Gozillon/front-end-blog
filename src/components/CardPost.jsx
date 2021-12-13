import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { API_URL } from '../config'
import { Link } from 'react-router-dom'

const CardPost = ({ post }) => {
  return (
    <Card className='article' sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='140'
        image={
          post.image !== null
            ? API_URL + post.image[0].formats.small.url
            : '...'
        }
        alt='green iguana'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {post.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {post.content && post.content.substring(0, 100)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/post/${post.id}`}>
          <Button size='small'>Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default CardPost
