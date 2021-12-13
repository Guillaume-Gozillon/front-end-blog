import { useState, useEffect } from 'react'
import CardPost from '../components/CardPost'
import postAPI from '../services/postAPI'
import PostsContentLoader from '../components/loaders/PostsContentLoader'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetchAllPosts()
  }, [])

  const fetchAllPosts = async () => {
    try {
      const data = await postAPI.findAll()
      setPosts(data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='posts'>
      <h1>Bienvenu sur le site de Strapi-React</h1>
      <div className='article-list'>
        {isLoading ? (
          <PostsContentLoader />
        ) : (
          posts.map(post => <CardPost post={post} key={post.id} />)
        )}
      </div>
    </div>
  )
}

export default Home
