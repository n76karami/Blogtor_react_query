import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Loading from "../Notfound/Loading";
import NotFound from "../Notfound/Notfound";
import Cookies from 'universal-cookie';
import BlogCard from "./BlogCard";  


import './Writer.css';
import axios from "axios";
import { useQuery } from "react-query";

const cookies = new Cookies();

const Writer = () => {

  const navigate = useNavigate();
  const params = useParams();
  // console.log(params);

  // const [writer, setWriter] = useState('');
  const [blogs, setBlogs] = useState([]);

  // const [loading, setLoading] = useState(true)
  // const [notFound, setNotFound] = useState(false)


  // const get_singleuser = () => {
  //   fetch(`http://localhost:4000/user/singleUser/${params.id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.msg === "bad request: no such user found") {
  //         setNotFound(true);
  //       }
  //       setWriter(data);
  //       setLoading(false);
  //     });
  // }

  // const get_userBlogs = () => {
  //   fetch('http://localhost:4000/blog/by-user', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       _id: params.id
  //     })
  //   }).then((res) => res.json())
  //     .then((data) => { 
  //       console.log(data);
  //       setBlogs(data);
  //       setLoading(false)
  //     })
  // }

  const get_singleuser_userBlogs = async () => {
    
    const res1 = await axios(`http://localhost:4000/user/singleUser/${params.id}`);
    const res2 = await axios.post("http://localhost:4000/blog/by-user", {
      _id: params.id
    });

    return {res1 , res2}

  }

  const { data, isLoading, isError, error } = useQuery('writer', get_singleuser_userBlogs);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  // useEffect(() => {
    
  //   get_singleuser();
  //   get_userBlogs();

  // }, [])
  
  // if (loading) return <Loading />;
  // if (notFound) return <NotFound />;


  return (
    <>
      <section></section>
      <div className="w-full h-screen relative px-8 ">
        <div className='absolute top-[calc(50vh-37%)] lg:left-[calc(50vw-35%)] left-[calc(50vw-45%)] flex flex-col
          w-[90%] lg:w-[70%] mx-auto px-1 py-3 bg-teal-100/40'>
          <div className="w-full">
            <button
              onClick={() => navigate('/writers')}
              className="md:p-3 p-2 bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white
               rounded-md">
              Back to All Writers
            </button>
          </div>
          <div className="my-5 grid md:grid-cols-3 place-items-center">
            <div className="mx-auto">
              <img
                className="md:w-[200px] md:h-[200px] w-[150px] h-[150px] 
                shadow-lg shadow-slate-600 rounded-[50%] border-[2px] border-blue-300"
                src={`http://localhost:4000/${data.res1.data.avatar}`}
                onError={(e) => (e.target.src = "/account.png")}
                alt="/"
              />
            </div>
            <div className="mx-auto md:ml-[-10px] ">
              <h1 className="text-center md:text-left px-5 py-2">{data.res1.data.username}</h1>
              <p className="text-center md:text-left px-5 py-2">{data.res1.data.name}</p>
              <p className="text-center py-2 break-words">{data.res1.data.bio ? data.res1.data.bio : "No bio has been entered yet!"}</p>
            </div>
            <div className="mx-auto md:ml-[-25px] md:mt-[-10px]">
              <ReactStars
                count={5}
                value={data.res1.data.averageScore}
                size={25}
                edit={false}
                activeColor="#ffc200"
              />
            </div>
          </div>
          <div className="border-2 border-black"></div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full py-3 mt-3 place-items-center'>
            {
              data.res2.data.length !== 0 ?
                data.res2.data.map(blog => {
                  // console.log(blogs);
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
  )
}

export default Writer;