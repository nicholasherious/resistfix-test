import React from 'react';
import {
  AdvancedImage,
  AdvancedVideo,
  lazyload,
  placeholder,
  responsive,
} from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import VimePlayer from './VimePlayer';
import Image from 'next/image';
import VideoPlayer from './Video/VideoPlayer';

function PostMedia({ post }) {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'ddqh186vu',
    },
  });

  const myVideo = cld.video(post.mediaPublicId).toURL();

  const myImage = cld
    .image(post.mediaPublicId)
    .quality('auto')
    .format('auto')
    .toURL();

 

  return (
    <div className=''>
      {post?.resourceType === 'image/jpeg' ? (
        <div className='h-full w-full rounded-2xl relative overflow-hidden '>
          <Image
            src={post.mediaUrl}
            height={100}
            width={100}
            layout='responsive'
            objectFit='fill'
          />
        </div>
      ) : null}
      {post?.resourceType === 'video/mp4' ? (
        // <VimePlayer urlSource={post.mediaUrl} />
        <VideoPlayer urlSource={post.mediaUrl}/>
      ) : null}
    </div>
  );
}

export default PostMedia;
