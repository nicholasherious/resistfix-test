import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Textarea } from '@mantine/core';
import { LoadingOverlay } from '@mantine/core';
import { useDropzone } from 'react-dropzone';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { CreatePostMutation, GET_ALL_POSTS } from '../graphql/queries';
import UploadingProgress from './PostFormComponents/UploadingProgress';
import { PostWarningAlert } from './Alerts/PostAlerts/PostAlerts';
import ImagePreviewTypes from './PostFormComponents/previews/ImagePreviewTypes';

type Inputs = {
  title: string;
  authorId: string;
  media: string;
};

// Yup required fields schema for posting

const schema = yup.object().shape({
  title: yup.string().required().min(10).max(280),
  media: yup
    .mixed()
    .test('fileSize', 'This file is too large. 15mb max', file => {
      if (file.size > 1) {
        return file.size < 15728640;
      } else {
        return true;
      }
    }),
});

// FUNCTION HEAD

function PostForm() {
  const { data: session } = useSession();

  // File Upload State

  const [files, setFiles] = useState();
  const [displayFile, setDisplayFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [mediaUpload, setMediaUpload] = useState(false);
  const [showDropzone, setShowDropzone] = useState(true);

  // File Upload State End

  const [createPost, { data, loading, error }] = useMutation(
    CreatePostMutation,
    { refetchQueries: [GET_ALL_POSTS] }
  );

  // Dropzone
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setFiles(acceptedFiles[0]);
    setDisplayFile(URL.createObjectURL(acceptedFiles[0]));
    setFileType(acceptedFiles[0].type);
    console.log(acceptedFiles[0]);
    setValue('media', acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    maxSize: 15728640,
    maxFiles: 1,
    accept: {
      'image/*': ['.jpg', '.png', '.jpeg'],
      'video/mp4': ['.mp4'],
    },
    multiple: false,
  });

  // Handle Functions

  const handleUploadFinish = () => {
    setDisplayFile(null);
    setUploading(false);
    setUploadingProgress(0);
    setFileType(null);
    reset();
  };

  const handleRemovePreview = () => {
    setDisplayFile(null);

    setFileType(null);
    reset();
  };

  // Handle Functions End.

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,

    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  if (session?.userId) setValue('authorId', session?.userId as string);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    // Post Media to Cloud
    setUploading(true);

    // Upload and Post to Database only if Media exists

    if (data.media) {
      const config = {
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadingProgress(percentCompleted);
        },
        headers: {
          'Content-Type': data?.media.type,
          'Access-Control-Allow-Origin': '*',
        },
      };

      try {
        const response = await axios.post('/api/upload/upload-mediav2', {
          name: data?.media.name,
          type: data?.media.type,
        });

        const s3data = await response.data;
        console.log(s3data);

        const postMedia = await axios.put(
          s3data.signedRequest,
          data?.media,
          config
        );

        console.log(postMedia);

        if (s3data) {
          // Post to Database
          createPost({
            variables: {
              title: data.title,
              authorId: data.authorId,
              mediaPublicId: 'something',
              resourceType: data?.media?.type,
              mediaUrl: s3data.mediaUrl,
            },
          });
        }
        // Reset Form and Image Preview
        handleUploadFinish();
      } catch (error) {
        console.log(error);
      }
    } else {
      createPost({
        variables: {
          title: data.title,
          authorId: data.authorId,
        },
      });
      handleUploadFinish();
    }
  };

  // Return
  return (
    <div className='relative' {...getRootProps()}>
      <LoadingOverlay visible={uploading} />

      <form
        className='bg-white shadow rounded-lg mb-6 p-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input hidden {...register('authorId', { required: true })} />

        <Textarea
          placeholder='Say something'
          variant='unstyled'
          autosize
          minRows={2}
          className={`w-full rounded-lg p-2 text-sm  mb-3 ${
            isDragActive
              ? 'border-2 border-blue-400 rounded-lg border-dashed'
              : 'bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 '
          } `}
          {...register('title', { required: true })}
        />

        <ImagePreviewTypes
          fileType={fileType}
          displayFile={displayFile}
          handlePreview={handleRemovePreview}
        />
        <input {...register('media')} {...getInputProps} hidden type='file' />

        {/* Input warning messages */}

        {errors?.title && (
          <PostWarningAlert alertMessage={errors?.title?.message} />
        )}

        {errors?.media && (
          <PostWarningAlert alertMessage={errors?.media?.message} />
        )}

        {/* End warning messages */}
        <div>
          {uploadingProgress > 0 && (
            <UploadingProgress progress={uploadingProgress} />
          )}
        </div>
        <footer className='flex justify-between mt-2'>
          <div className='flex gap-2' onClick={open}>
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
          <button
            type='submit'
            className='flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg'
          >
            Post
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
