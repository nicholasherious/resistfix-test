import React from 'react';
import CommentList from './CommentList';
import PostComment from './PostComment';

function Comment( {post}) {
  return (
    <div>
        {post?.comments?.map(comment => (
            <CommentList key={comment.id} comment={comment}/>
        ))}
     
     <PostComment post={post}/>
    </div>
  );
}

export default Comment;
