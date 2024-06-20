import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/context";

const Home = () => {
  const { blogPostData, setBlogPostData } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getBlogPostApi = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setBlogPostData((prevData) => [...prevData, ...data]);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (blogPostData?.length === 0) {
      getBlogPostApi();
    }
  }, []);

  if (isLoading) {
    return <h1 className="text-center font-bold">Loading...</h1>;
  }

  return (
    <div className="px-4 flex flex-col items-center">
      <h1 className="text-center font-bold my-6 text-xl">List of Blog Posts</h1>
      <button
        type="button"
        onClick={() => navigate("/create-blog-post")}
        className="p-2 bg-gray-200 rounded-md mb-4"
      >
        Create Blog Post
      </button>
      <div className="w-full max-w-[70%]">
        {blogPostData?.length > 0 &&
          blogPostData?.map((data) => (
            <div
              onClick={() => navigate(`/blog-post?id=${data?.id}`)}
              key={data?.id}
              className="border cursor-pointer rounded-md p-4 my-4 text-center"
            >
              <h1 className="text-lg font-semibold mb-2">{data?.title}</h1>
              <p className="text-sm text-gray-600">{data?.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
