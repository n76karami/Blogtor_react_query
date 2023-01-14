import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Notfound/Loading';
import BlogCard from './BlogCard';
import WriterCard from './WriterCard';

const Home = () => {

  const [topblog_modal, setTopblog_modal] = useState(false);
  const [topuser_modal, setTopuser_modal] = useState(false);

  // const [top_blogs, settop_blogs] = useState([]);
  // const [top_writers, settop_writers] = useState([]);

  // const get_Topblogs = () => {
  //   fetch('http://localhost:4000/blog/top-blogs', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       settop_blogs(data);
  //     })
  // }

  // const get_Topwriters = () => {
  //   fetch('http://localhost:4000/user/top-users', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       settop_writers(data);
  //     })
  // }

  const get_Topblogs_Topwriters = async () => {
    const res1 = await axios("http://localhost:4000/blog/top-blogs");
    const res2 = await axios("http://localhost:4000/user/top-users");

    return {res1 , res2};
  }

  const { data, isLoading, isError, error } = useQuery('top_blog_writer', get_Topblogs_Topwriters);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)


  return (
    <div className='w-full h-screen relative'>
      <img
        className='w-full h-full object-cover'
        src='./blog.jpg'
        alt='/'
      />
      <div className='absolute w-full h-full top-0 left-0 bg-blue-300/20'></div>
      <div className='absolute top-0 w-full h-full text-center flex flex-col justify-center '>
        <h1 className='text-[#5651e5]'>WELCOME TO BLOGTOR</h1>
        <div className='w-full mt-5 mx-auto flex flex-col py-4 justify-center items-center md:flex-row '>
          <button
            onClick={() => {
              setTopuser_modal(true);
              // get_Topwriters
            }}
            className='w-2/3 py-3 bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white my-4 rounded-md
            md:w-1/4 md:py-4 md:mr-6
          '>
            Popular Writers
          </button>
          <button
            onClick={() => {
              setTopblog_modal(true);
              // get_Topblogs
            }}
            className='w-2/3 py-3 bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white rounded-md
            md:w-1/4 md:py-4 
          '>
            Popular Blogs
          </button>
        </div>
      </div>
      {topblog_modal ? 
        <>
          <div
            className="bg-gray-800/90 fixed top-0 left-0 w-screen h-screen z-20 "
            onClick={() => setTopblog_modal(false) }>
          </div>
          <div className='bg-gray-200 absolute w-5/6 md:w-2/3 px-5 py-2 lg:w-[70%] rounded-md
            lg:top-[calc(50vh-17%)] lg:left-[calc(50vw-35%)]
            md:top-[calc(50vh-17%)] md:left-[calc(50vw-32%)]
            top-[calc(50vh-17%)] left-[calc(50vw-42%)]
            mx-auto z-30 flex flex-col lg:flex-row md:gap-3 justify-center items-center '>
            
            {
              data.res1.data.length !== 0 ?
                data.res1.data.map(blog => {
                return (
                <BlogCard
                  blog={blog}
                />
            )
          })
              :
              ''
            }

          </div>
        </>
        :
        ''
      }
      {topuser_modal ? 
        <>
          <div
            className="bg-gray-800/90 fixed top-0 left-0 w-screen h-screen z-20 "
            onClick={() => setTopuser_modal(false) }>
          </div>
          <div className='bg-gray-200 absolute w-5/6 md:w-2/3 px-5 py-2 lg:w-[80%] rounded-md
            lg:top-[calc(50vh-17%)] lg:left-[calc(50vw-40%)]
            md:top-[calc(50vh-17%)] md:left-[calc(50vw-32%)]
            top-[calc(50vh-17%)] left-[calc(50vw-42%)]
            mx-auto z-30 flex flex-col lg:flex-row md:gap-3 justify-center items-center '>
            
            {
              data.res2.data.length !== 0 ?
                data.res2.data.map(writer => {
                return (
                <WriterCard
                writer={writer}
                />
            )
          })
              :
              ''
            }

          </div>
        </>
        :
        ''
      }
    </div>
  )
}

export default Home;