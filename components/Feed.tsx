import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_POSTS } from '../graphql/queries';
import { Ripples } from '@uiball/loaders';
import Post from './Post';

type Props = {
  post: Post[];
};

function Feed() {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  if (loading)
    return (
      <div className='flex w-full items-center justify-center p-10 text-xl'>
        <Ripples size={50} speed={2} color='#1F2937' />
      </div>
    );
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div className="">
      {data?.posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
