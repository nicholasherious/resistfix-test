import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query {
    posts {
      id
      title
      mediaUrl
      authorId
      user {
        name
        image
        role
        id
      }
      comments {
        text
        user {
          name
          image
          id
        }
      }
      mediaPublicId
      resourceType
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query SinglePost($postId: String!) {
    singlePost(postId: $postId) {
      id
      title
      mediaPublicId
      resourceType
      category
      authorId
      mediaUrl
      user {
        name
        id
        image
      }
      comments {
        id
        text
        authorId
        user {
          name
          id
        }
      }
    }
  }
`;

export const CreatePostMutation = gql`
  mutation CreatePost(
    $title: String!
    $mediaPublicId: String
    $authorId: String
    $resourceType: String
    $mediaUrl: String
  ) {
    createPost(
      title: $title
      mediaPublicId: $mediaPublicId
      authorId: $authorId
      resourceType: $resourceType
      mediaUrl: $mediaUrl
    ) {
      id
      title
      mediaPublicId
      resourceType
      authorId
      mediaUrl
      user {
        id
        name
      }
    }
  }
`;

export const CreateCommentMutation = gql`
  mutation CreateComment($text: String!, $authorId: String, $postId: String) {
    createComment(text: $text, authorId: $authorId, postId: $postId) {
      id
      text
      authorId
      postId
      user {
        name
      }
      post {
        title
      }
    }
  }
`;
