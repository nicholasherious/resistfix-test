import React from 'react';

function AddFriend() {
  return (
    <div>
      <div className='bg-white shadow rounded-lg p-10'>
        <div className='flex flex-col gap-1 text-center items-center'>
          <img
            className='h-32 w-32 bg-white p-2 rounded-full shadow mb-4'
            src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            alt=''
          />
          <p className='font-semibold'>John Doe</p>
          <div className='text-sm leading-normal text-gray-400 flex justify-center items-center'>
            <svg
              viewBox='0 0 24 24'
              className='mr-1'
              width={16}
              height={16}
              stroke='currentColor'
              strokeWidth={2}
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
              <circle cx={12} cy={10} r={3} />
            </svg>
            Los Angeles, California
          </div>
        </div>
        <div className='flex justify-center items-center gap-2 my-3'>
          <div className='font-semibold text-center mx-4'>
            <p className='text-black'>102</p>
            <span className='text-gray-400'>Posts</span>
          </div>
          <div className='font-semibold text-center mx-4'>
            <p className='text-black'>102</p>
            <span className='text-gray-400'>Followers</span>
          </div>
          <div className='font-semibold text-center mx-4'>
            <p className='text-black'>102</p>
            <span className='text-gray-400'>Folowing</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFriend;
