import { useEffect, useRef, useState } from "react";

import useSwr from "swr";
import * as UpChunk from "@mux/upchunk";

import axios from "axios";
import GetVideoAsset from "./video/GetVideoAsset";

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

function UploadVideo() {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [uploadId, setUploadId] = useState(null);
  const inputRef = useRef(null);
  // console.log(inputRef?.current?.files[0]);
  // console.log(statusMessage);

  const { data, error } = useSwr(
    () => (isPreparing ? `/api/upload/video/${uploadId}` : null),
    fetcher,
    { refreshInterval: 5000 }
  );

  const upload = data && data.upload;

  if (upload) {
    return <GetVideoAsset upload={upload} />;
  }

  const createUpload = async () => {
    try {
      return fetch("/api/upload/video/video", {
        method: "POST",
      })
        .then((res) => res.json())
        .then(({ id, url }) => {
          console.log(id);
          setUploadId(id);
          return url;
        });
    } catch (e) {
      console.error("Error in createUpload", e);
    }
  };

  const handleUpload = async () => {
    try {
      const upload = UpChunk.createUpload({
        endpoint: createUpload, // Authenticated url
        file: inputRef.current.files[0], // File object with your video file’s properties
        chunkSize: 30720, // Uploads the file in ~30 MB chunks
      });

      // Subscribe to events
      upload.on("error", (error) => {
        setStatusMessage(error.detail);
      });

      upload.on("progress", (progress) => {
        setProgress(progress.detail);
      });

      upload.on("success", () => {
        setIsPreparing(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-5">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleUpload}
              ref={inputRef}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default UploadVideo;
