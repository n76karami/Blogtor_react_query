import React , {useState , useEffect} from "react";
import Loading from "../Notfound/Loading";
import BlogCard from "./BlogCard";  

import "./AllBlogs.css";
import { useQuery } from "react-query";
import axios from "axios";

const AllBlogs = () => {

  // const [blogs, setBlogs] = useState("");
  // const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   fetch('http://localhost:4000/blog', {
  //     method: `GET`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       setBlogs(data)
  //       setLoading(false)
  //     })
  // }, [])

  // if (loading) return <Loading />

  const getAllblogs = async () => {
    const { data } = await axios("http://localhost:4000/blog")
    return data;
  }

  const { data, isLoading, isError, error } = useQuery('blogs', getAllblogs);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  return (
    <>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <div className='w-full h-screen relative px-8'>
        <div className='absolute top-[calc(50vh-37%)] left-[calc(50vw-48%)] flex flex-col w-[96%] mx-auto px-1 py-3'>
          <h1 className="text-center text-gray-100">All Blogs</h1>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full py-3 mt-3 place-items-center'>
          {
          data.length !== 0 ?
            data.map(blog => {
            return (
              <BlogCard
                blog={blog}
              />
            )
          })
            :
            <p className="font-semibold md:col-span-2 lg:col-span-3 pt-20">No blogs created yet.</p>
        }
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
