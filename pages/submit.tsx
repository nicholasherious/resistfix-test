import React from 'react';
import { useSession } from "next-auth/react"
import { useForm, SubmitHandler } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { CreatePostMutation, GET_ALL_POSTS } from '../graphql/queries';

type Inputs = {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  category: string;
  authorId: string
};

function Submit() {
  const { data: session, status } = useSession()
  const [submitPost, { data, loading, error }] = useMutation(
    CreatePostMutation,
    { refetchQueries: [GET_ALL_POSTS] }
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    submitPost({ variables: data });
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  console.log('Data Returned', data);

  console.log(session?.userId)
  //   console.log(watch('example')); // watch input value by passing the name of it
  return (
    <div className='max-w-3xl mx-auto mt-5'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Title
          </label>
          <input
            {...register('title')}
            id='title'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Post Title'
            required
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Description
          </label>
          <input
            {...register('description')}
            id='description'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Image Url
          </label>
          <input
            {...register('imageUrl')}
            id='imageUrl'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Url
          </label>
          <input
            {...register('url')}
            type='text'
            id='url'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Category
          </label>
          <input
            {...register('category')}
            type='text'
            id='category'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>

        <input  {...register('authorId')} type="text" id="authorId" placeholder={session?.userId}/>

        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Submit;
