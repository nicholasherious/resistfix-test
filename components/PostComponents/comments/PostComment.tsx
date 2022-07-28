import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import {
  CreateCommentMutation,
  GET_SINGLE_POST,
} from '../../../graphql/queries';
import { useSession } from 'next-auth/react';

type Inputs = {
  text: string;
  postId: string;
  authorId: string;
};

function PostComment({ post }) {
  const { data: session } = useSession();

  const [createComment, { data, loading, error }] = useMutation(
    CreateCommentMutation,
    { refetchQueries: [GET_SINGLE_POST] }
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  if (session?.userId) setValue('authorId', session?.userId as string);
  if (post?.id) setValue('postId', post?.id as string);

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    createComment({
      variables: {
        text: data.text,
        postId: data.postId,
        authorId: data.authorId,
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400'>
          <img
            className='w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer'
            alt='User avatar'
            src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
          />

          <span className='absolute inset-y-0 right-0 flex items-center pr-6'>
            <button
              type='submit'
              className='p-1 focus:outline-none focus:shadow-none hover:text-blue-500'
            >
              <svg
                className='w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </button>
          </span>
          <input hidden {...register('authorId', { required: true })} />
          <input hidden {...register('postId', { required: true })} />
          <input
            {...register('text')}
            type='search'
            className='w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400'
            style={{ borderRadius: 25 }}
            placeholder='Post a comment...'
            autoComplete='off'
          />
        </div>
      </form>
    </div>
  );
}

export default PostComment;
