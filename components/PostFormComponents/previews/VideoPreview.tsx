import React from 'react';

function VideoPreview({ displayFile, handlePreview }) {
  return (
    <div className=' mb-4'>
      <div
        className=' w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer text-white'
        onClick={() => handlePreview()}
      >
        {' '}
        X{' '}
      </div>
      <video
        autoPlay="true"
        className='rounded-2xl max-h-80 object-fill'
        src={displayFile}
      />
    </div>
  );
}

export default VideoPreview;