import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import CreateBlogPost from "./pages/CreateBlogPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog-post" element={<BlogPost />} />
          <Route path="/create-blog-post" element={<CreateBlogPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
