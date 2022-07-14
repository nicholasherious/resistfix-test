import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import useSwr from "swr";
import VideoPlayer from "./VideoPlayer";

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

function GetVideoAsset({ upload }) {
  const [playBackId, setPlayBackId] = useState(null);


  const { data, error } = useSwr(
    () => (upload ? `/api/upload/video/asset/${upload.asset_id}` : null),
    fetcher,
    { refreshInterval: 5000 }
  );

  const asset = data && data.asset;

  useEffect(() => {
    if (asset && asset.playback_id && asset.status === "ready") {
      setPlayBackId(asset.playback_id);
    }
  }, [asset]);

  let errorMessage;

  if (error) {
    errorMessage = "Error fetching api";
  }

  if (data && data.error) {
    errorMessage = data.error;
  }

  if (asset && asset.status === "errored") {
    const message = asset.errors && asset.errors.messages[0];
    errorMessage = `Error creating this asset: ${message}`;
  }
  return (
    <div>
      <div>{playBackId ? <VideoPlayer playBackId={playBackId}/> : "Preparing...."}</div>
    </div>
  );
}

export default GetVideoAsset;
