import React from 'react';

type Props = {
  post: Post;
};

function PostOLD({ post }: Props) {
  console.log(post);

  return (
    <div className="mb-6">
      <div className='max-w-lg p-4 shadow-md bg-gray-50 text-gray-800'>
        <div className='flex justify-between pb-4 border-bottom'>
          <div className='flex items-center'>
            <a
              rel='noopener noreferrer'
              href='#'
              className='mb-0 capitalize text-gray-800'
            >
              {post.category}
            </a>
          </div>
          <a rel='noopener noreferrer' href='#'>
           {post.id}
          </a>
        </div>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <img
              src={post.imageUrl}
              alt={post.title}
              className='block object-cover object-center w-full rounded-md  bg-gray-500'
            />
            <div className='flex items-center text-xs'>
              <span>6 min ago</span>
            </div>
          </div>
          <div className='space-y-2'>
            <a rel='noopener noreferrer' href='#' className='block'>
              <h3 className='text-xl font-semiBold text-violet-600'>
                {post.title}
              </h3>
            </a>
            <p className='leading-snug text-gray-600'>{post.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostOLD;
