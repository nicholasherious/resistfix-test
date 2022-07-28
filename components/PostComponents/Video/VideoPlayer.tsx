import { url } from 'inspector';
import React from 'react';
import ReactPlayer from 'react-player';
import PlyrComponent from './PlyrComponent';



const VideoPlayer = ({ urlSource }) => {

  

  return (
    <>
      {/* <PlyrComponent urlSource={urlSource}/> */}
      <ReactPlayer url={urlSource} controls={true} muted={true} width='100%' height='auto' className="bg-gray-800"/>
      
    </>
  );
}

export default VideoPlayer