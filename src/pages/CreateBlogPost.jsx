import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/context";

const CreateBlogPost = () => {
  const { blogPostData, setBlogPostData } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  const CreateBlogPostApi = async (payload) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      setBlogPostData((prevData) => [...prevData, data]);
      setFormData({
        title: "",
        body: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) {
      alert("Title and content are required");
      return;
    }
    CreateBlogPostApi(formData);
  };
  return (
    <div className="flex justify-center  mt-4">
      <div className="flex flex-col w-96">
        {" "}
        <h1 className="text-center text-2xl  font-bold mb-4">
          Create Blog Post
        </h1>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="p-2 mx-auto bg-gray-200 rounded-md mb-4"
        >
          Go to Home
        </button>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your title"
            className="border  p-4"
            name="title"
            value={formData?.title}
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            type="text"
            placeholder="Enter your content"
            className="border  p-4"
            name="body"
            value={formData?.body}
            onChange={handleChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-green-500 text-white border p-4 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPost;
