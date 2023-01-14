import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./dashbordLayout/BlogList";
import CreateBlog from "./dashbordLayout/CreateBlog";
import Dashbordlayout from "./dashbordLayout/Dashbordlayout";
import EditBlog from "./dashbordLayout/EditBlog";
import Editprofile from "./dashbordLayout/Editprofile";
import NotFound from "./Notfound/Notfound";
import AllBlogs from "./WebLayout/AllBlogs";
import AllWriters from "./WebLayout/AllWriters";
import Blog from "./WebLayout/Blog";
import Home from "./WebLayout/Home";
import LoginSignup from "./WebLayout/LoginSignup";
import WebLayout from "./WebLayout/WebLayout";
import Writer from "./WebLayout/Writer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<WebLayout />}>
            <Route path='' element={<Home />} />
            <Route path='login' element={<LoginSignup />} />
            <Route path='blogs' element={<AllBlogs />} />
            <Route path='blog/:id' element={<Blog />} />
            <Route path='writers' element={<AllWriters />} />
            <Route path='writer/:id' element={<Writer />} />
          </Route>

          <Route path="/dashbord" element={<Dashbordlayout />}>
            <Route path='' element={<BlogList />} />
            <Route path='createblog/:id' element={<CreateBlog/>} />
            <Route path='editprofile/:id' element={<Editprofile />} />
            <Route path='editblog/:id' element={<EditBlog />} />
          </Route>


          <Route path="*" element={<NotFound />}></Route>
          
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
