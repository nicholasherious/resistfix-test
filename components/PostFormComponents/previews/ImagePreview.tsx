import React from 'react';

function ImagePreview({ displayFile, handlePreview }) {
  return (
    <div className='relative mb-4'>
      <div
        className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer text-white'
        onClick={() => handlePreview()}
      >
        {' '}
        X{' '}
      </div>
      <img
        alt='preview'
        className='rounded-2xl max-h-80 object-fill'
        src={displayFile}
      />
    </div>
  );
}

export default ImagePreview;
