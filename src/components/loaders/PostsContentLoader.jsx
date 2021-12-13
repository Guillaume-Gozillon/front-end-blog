import { Box, Skeleton } from '@mui/material'

const PostsContentLoader = () => {
  return (
    <Box>
      <Skeleton variant='rectangular' width={210} height={118} />
      <Skeleton width='60%' />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Box>
  )
}

export default PostsContentLoader
