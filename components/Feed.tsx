import React from "react";
import { useQuery } from "@apollo/client";

import { GET_ALL_POSTS } from "../graphql/queries";
import Post from "./Post";
import Loading from "./Loading/Loading";

type Props = {
  post: Post[];
};

function Feed() {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  if (loading) return <Loading />;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div className="">
      {data?.posts.map((post: any) => (
        <Post
          key={post.id}
          post={post}
          isSinglePage={{
            id: "",
            title: "",
            url: "",
            description: "",
            imageUrl: "",
            category: "",
            comments: [],
            isSinglePage: "",
          }}
        />
      ))}
    </div>
  );
}

export default Feed;
