import React from 'react';

function PostForm() {
  return (
    <div>
      <form className='bg-white shadow rounded-lg mb-6 p-4'>
        <textarea
          name='message'
          placeholder='Type something...'
          className='w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400'
          defaultValue={''}
        />
        <footer className='flex justify-between mt-2'>
          <div className='flex gap-2'>
            <span className='flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer'>
              <svg
                viewBox='0 0 24 24'
                width={24}
                height={24}
                stroke='currentColor'
                strokeWidth={2}
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='css-i6dzq1'
              >
                <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                <circle cx='8.5' cy='8.5' r='1.5' />
                <polyline points='21 15 16 10 5 21' />
              </svg>
            </span>
            <span className='flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer'>
              <svg
                viewBox='0 0 24 24'
                width={24}
                height={24}
                stroke='currentColor'
                strokeWidth={2}
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='css-i6dzq1'
              >
                <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
                <circle cx={12} cy={10} r={3} />
              </svg>
            </span>
            <span className='flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer'>
              <svg
                viewBox='0 0 24 24'
                width={24}
                height={24}
                stroke='currentColor'
                strokeWidth={2}
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='css-i6dzq1'
              >
                <polyline points='4 17 10 11 4 5' />
                <line x1={12} y1={19} x2={20} y2={19} />
              </svg>
            </span>
          </div>
          <button className='flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg'>
            Send
            <svg
              className='ml-1'
              viewBox='0 0 24 24'
              width={16}
              height={16}
              stroke='currentColor'
              strokeWidth={2}
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1={22} y1={2} x2={11} y2={13} />
              <polygon points='22 2 15 22 11 13 2 9 22 2' />
            </svg>
          </button>
        </footer>
      </form>
    </div>
  );
}

export default PostForm;
