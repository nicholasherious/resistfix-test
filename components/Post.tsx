import Link from 'next/link';
import React from 'react';
import Comment from './PostComponents/comments/Comment';
import NoComments from './PostComponents/comments/NoComments';
import PostMedia from './PostComponents/PostMedia';
import PostOptions from './PostComponents/PostOptions';
import VoteBox from './PostComponents/VoteBox';

type Props = {
  post: Post;
 isSinglePage: Post
};

function Post({ post, isSinglePage }: Props) {
  console.log(post);
  return (
    <div className='mb-6'>
      <div className='bg-white shadow rounded-lg'>
        <div className='flex justify-between'>
          <div className='flex flex-row px-2 py-3 mx-3'>
            <div className='w-auto h-auto rounded-full border-2 border-green-500'>
              <img
                className='w-12 h-12 object-cover rounded-full shadow cursor-pointer'
                alt='User avatar'
                src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200'
              />
            </div>
            <div className='flex flex-col mb-2 ml-4 mt-1'>
              <div className='text-gray-600 text-sm font-semibold'>
                {post?.user.name}
              </div>
              <div className='flex w-full mt-1'>
                <div className='text-blue-700 font-base text-xs mr-1 cursor-pointer'>
                  {post?.category}
                </div>
                <div className='text-gray-400 font-thin text-xs'>
               <Link href={`post/${post.id}`}><a>  • 1 day ago </a></Link> 
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
          <div className="mx-3 py-3 px-2 justify-items-end"><PostOptions /></div>
          </div>
        </div>
        <div className='border-b border-gray-100'></div>
        <div className='text-gray-400  text-sm mb-7 mt-6 mx-3 px-2 '>
          <div className='text-gray-800 text-base mb-6 mx-3 px-2 '>
            {post.title}
          </div>
          <div className=''>
            {post?.resourceType?.length > 0  && 
              <PostMedia post={post} /> }
            
          </div>
        </div>

        {/* <div className='text-gray-600 font-semibold  mb-2 mx-3 px-2'>
          {post.title}
        </div> */}

        <div className='flex justify-start mb-4 border-t border-gray-100'>
          <div className='flex w-full mt-1 pt-2 pl-5'>
            <span className='bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                width='14px'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                ></path>
              </svg>
            </span>
            <img
              className='inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
              src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
              alt=''
            />
            <img
              className='inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
              src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
              alt=''
            />
            <img
              className='inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
              src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80'
              alt=''
            />
            <img
              className='inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
              src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80'
              alt=''
            />
          </div>
          <div className='flex justify-end w-full mt-1 pt-2 pr-5'>
            <span className='transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                width='14px'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                ></path>
              </svg>
            </span>
            <span className='transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer'>
              <svg
                className='h-4 w-4 text-red-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'
                ></path>
              </svg>
            </span>
          </div>
        </div>
        <div className='flex w-full border-t border-gray-100'>
          <div className='mt-3 mx-5 flex flex-row text-xs'>
            <div className='flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center'>
              Comments:
              <div className='ml-1 text-gray-400 text-ms'>
                {' '}
                {post?.comments.length}
              </div>
            </div>
            <div className='flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center'>
              Views: <div className='ml-1 text-gray-400 text-ms'> 60k</div>
            </div>
          </div>
          <div className='mt-3 mx-5 w-full flex justify-end text-xs'>
            <div className='flex text-gray-700  rounded-md mb-2 mr-4 items-center'>
              Likes: <div className='ml-1 text-gray-400 text-ms'> 120k</div>
            </div>
          </div>
        </div>
        
        <div>
        {isSinglePage ?  <Comment post={post}/> : null}
        </div>
       
        
       
      </div>
    </div>
  );
}

export default Post;
