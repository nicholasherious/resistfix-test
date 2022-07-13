import React from 'react'

import MuxVideo from '@mux-elements/mux-video-react'

function PlayBack({ playbackId, poster }) {
    console.log(playbackId)
    console.log(poster)
  return (
    <div className="max-w-2xl mx-auto mt-5">
         <MuxVideo
        style={{ height: '100%', maxWidth: '100%' }}
        playbackId={playbackId}
        metadata={{
          video_id: 'video-id-123456',
          video_title: 'Super Interesting Video',
          viewer_user_id: 'user-id-bc-789',
        }}
        streamType="on-demand"
        controls
        autoPlay
        muted
      />
    </div>
  )
}

export default PlayBack


export function getStaticProps({ params: { id: playbackId } }) {
    const poster = `https://image.mux.com/${playbackId}/thumbnail.png`
  
    return { props: { playbackId, poster } }
  }
  
  export function getStaticPaths() {
    return {
      paths: [],
      fallback: true,
    }
  }