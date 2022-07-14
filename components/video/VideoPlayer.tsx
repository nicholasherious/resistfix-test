import React from "react";
import MuxPlayer from "@mux/mux-player-react";

function VideoPlayer({ playBackId }) {
  return (
    <div>
      <MuxPlayer
        streamType="on-demand"
        playbackId={playBackId}
        metadata={{
          video_id: "video-id-54321",
          video_title: "Test video title",
          viewer_user_id: "user-id-007",
        }}
      />
    </div>
  );
}

export default VideoPlayer;
