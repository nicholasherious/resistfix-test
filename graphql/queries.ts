import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query {
    posts {
      id
      title
      url
      description
      imageUrl
      category
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
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query SinglePost($postId: String!) {
    singlePost(postId: $postId) {
      id
      title
      url
      description
      imageUrl
      category
      authorId
      user {
        name
        email
        image
        role
        id
      }
      comments {
        text
        authorId
        user {
          name
          image
        }
      }
    }
  }
`;

export const CreatePostMutation = gql`
  mutation CreatePost(
    $title: String!
    $url: String
    $description: String
    $imageUrl: String
    $category: String
    $authorId: String
  ) {
    createPost(
      title: $title
      url: $url
      description: $description
      imageUrl: $imageUrl
      category: $category
      authorId: $authorId
    ) {
      id
      title
      url
      description
      imageUrl
      category
      authorId
    }
  }
`;
