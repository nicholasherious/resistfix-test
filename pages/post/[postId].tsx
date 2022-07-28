import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_SINGLE_POST } from '../../graphql/queries';
import Post from '../../components/Post';
import Trending from '../../components/Trending';
import AddFriend from '../../components/AddFriend';
import { NavbarMinimal } from '../../components/NavbarMinimal';
import Loading from '../../components/Loading/Loading';
function PostPage() {
  const [isSinglePage, setSinglePage] = useState<boolean>(true);
  const router = useRouter();
  const { data, loading } = useQuery(GET_SINGLE_POST, {
    variables: {
      postId: router.query.postId,
    },
  });
  console.log(data);
  const post: Post = data?.singlePost;

  if (loading) {
    return <Loading />;
  }
  return (
    <div className='my-4 max-w-6xl mx-auto'>
      <div className='flex space-x-4 px-3'>
        <div className='hidden md:block'>
          <NavbarMinimal />
        </div>
        <div className='max-w-2xl mx-auto w-full'>
          {' '}
          <Post key={post.id} post={post} isSinglePage={isSinglePage} />
        </div>
        <div className='hidden md:block'>
          {' '}
          <Trending />
          
        </div>
      </div>
    </div>
  );
}

export default PostPage;
