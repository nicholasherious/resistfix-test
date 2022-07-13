import React from 'react'
import { useQuery} from '@apollo/client'
import { useRouter} from "next/router"
import { GET_SINGLE_POST } from '../../graphql/queries'
import Post from '../../components/Post'
import Trending from '../../components/Trending'
import AddFriend from '../../components/AddFriend'
function PostPage() {
    const router = useRouter()
    const {data, loading} = useQuery(GET_SINGLE_POST, {variables: {
        postId: router.query.postId
    }})
    console.log(data)
    const post: Post = data?.singlePost

    if(loading) {
        return <h1>Loading...</h1>
    }
  return (
    <div className="my-7 max-w-5xl mx-auto">
        <div className="flex space-x-4">

        
        
        <Post key={post.id} post={post}/>
        <Trending />
        
        </div>
    </div>
  )
}

export default PostPage