import React from 'react'
import ImagePreview from './ImagePreview'
import VideoPreview from './VideoPreview'

function ImagePreviewTypes({fileType, displayFile, handlePreview}) {
  return (
    <div>
         {fileType === 'image/png' && (
          <ImagePreview
            displayFile={displayFile}
            handlePreview={handlePreview}
          />
        )}
        {fileType === 'image/jpg' && (
          <ImagePreview
            displayFile={displayFile}
            handlePreview={handlePreview}
          />
        )}
        {fileType === 'image/jpeg' && (
          <ImagePreview
            displayFile={displayFile}
            handlePreview={handlePreview}
          />
        )}
        {/* Show Video Preview */}

        {fileType === 'video/mp4' && (
          <VideoPreview
            displayFile={displayFile}
            handlePreview={handlePreview}
          />
        )}
    </div>
  )
}

export default ImagePreviewTypes   