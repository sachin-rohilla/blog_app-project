import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const BlogPost = () => {
  const [searchQuery] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const queryId = searchQuery.get("id");
  const [singlePostData, setSinglePostData] = useState({});

  const getBlostPostById = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();
      setSinglePostData(data);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlostPostById(queryId);
  }, []);

  if (isLoading) {
    return <h1 className="text-center font-bold">Loading...</h1>;
  }

  return (
    <div className="px-4 text-center">
      <h1 className="font-bold py-8 text-2xl">Single Post By ID</h1>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="p-2 bg-gray-200 rounded-md mb-4"
      >
        Go to Home
      </button>
      {singlePostData && (
        <div>
          <h2 className="text-lg font-medium">{singlePostData?.title}</h2>
          <h2 className="">{singlePostData?.body}</h2>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
