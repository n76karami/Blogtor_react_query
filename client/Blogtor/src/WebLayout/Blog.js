import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Loading from "../Notfound/Loading";
import NotFound from "../Notfound/Notfound";
import Cookies from 'universal-cookie';

import './Blog.css';
import axios from "axios";
import { useQuery , useMutation, useQueryClient } from "react-query";

const cookies = new Cookies();

const Blog = () => {

  const navigate = useNavigate();
  const params = useParams();
  // console.log(params)
  const queryClient = useQueryClient();

  // const [blog, setBlog] = useState("");
  // const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // const [loading, setLoading] = useState(true);
  // const [notFound, setNotFound] = useState(false);

  const token = cookies.get('token')

  // const async_get_singleblog = async () => {
  //   const res = await fetch(`http://localhost:4000/blog/single-blog/${params.id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json()

  //   console.log(data);
  //   if (data.msg === "Unexpected token u in JSON at position 0") {
  //     setNotFound(true);
  //   }
  //   setBlog(data);
  //   setLoading(false);
  // }

  // const async_get_comments = async () => {
  //   const res = await fetch(`http://localhost:4000/comment/by-blog/${params.id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  //   setComments(data);
  //   setLoading(false);
  // }
////////////////////////////////////////////////////////////////////////////////////////////////
  // const get_singleblog = () => {
  //   fetch(`http://localhost:4000/blog/single-blog/${params.id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.msg === "Unexpected token u in JSON at position 0") {
  //         setNotFound(true);
  //       }
  //       setBlog(data);
  //       setLoading(false);

  //     });
  // };

  // const get_Comments = () => {
  //   fetch(`http://localhost:4000/comment/by-blog/${params.id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setComments(data);
  //       setLoading(false);
  //     })
  // }

  const get_singleblog_comments = async () => {

    const res1 = await axios(`http://localhost:4000/blog/single-blog/${params.id}`);

    const res2 = await axios(`http://localhost:4000/comment/by-blog/${params.id}`);

    return {res1 , res2};
  }

  const { data, isLoading, isError, error } = useQuery('blog', get_singleblog_comments);



  // const submitRate = (newRate) => {

  //   if (!token) {
  //     window.location.assign(`http://localhost:3000/login`)
  //     return alert("You have to login or sign up before submiting a rate!")
  //   } 

  //   fetch('http://localhost:4000/blog/submit-rate', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth' : `ut ${token}`
  //     },
  //     body: JSON.stringify({
  //       blogId: params.id,
  //       score: Number(newRate)
  //     })
  //   }).then((res) => res.json())
  //     .then(data => {
  //       console.log(data);
  //       // get_singleblog()
  //       // window.location.assign(`${params.id}`);
  //       alert("Your rate submited successfully!");
  //       // get_Comments()
  //     })
  // }

  const submit_Rate = async (newRate) => {
    
    if (!token) {
      window.location.assign(`http://localhost:3000/login`)
      return alert("You have to login or sign up before submiting a rate!")
    } 

    alert("Your rate submited successfully!");

    return await axios.post("http://localhost:4000/blog/submit-rate", {
      blogId: params.id,
      score: Number(newRate)
    }, {
      headers: {
        'auth': `ut ${token}`
      }
    })
  }

  const submit_Rate_Mutation = useMutation(submit_Rate, {
    onSuccess: () => {
      // invalidates cache and refetch
      queryClient.invalidateQueries("blog")
    }
  })


  // const submitComment = () => {
    
  //   if (!token) {
  //     window.location.assign(`http://localhost:3000/login`)
  //     return alert("You have to login or sign up before submiting a comment!")
  //   } 

  //   fetch('http://localhost:4000/comment/submit', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': `application/json`,
  //       'auth': `ut ${token}`
  //     },
  //     body: JSON.stringify({
  //       text: comment,
  //       blogId: params.id
  //     }),
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.msg === 'bad request: bad inputs') return alert("The field cannot be empty!");
  //       if (data.msg === 'ok') {
  //         setComment("");
  //         // window.location.assign(`${params.id}`);
  //         // get_Comments()
  //         return alert("Your comment submited successfully!");
  //       }
  //     })

  // }

  const submit_comment = async () => {

    if (!token) {
      window.location.assign(`http://localhost:3000/login`)
      return alert("You have to login or sign up before submiting a comment!")
    } 

    setComment("");

    return await axios.post("http://localhost:4000/comment/submit",
      {
        text: comment,
        blogId: params.id
      }
      ,
      {
      headers: {
        'auth': `ut ${token}`
      }
    });
     
  }

  const submit_comment_Mutation = useMutation(submit_comment, {
    onSuccess: () => {
      // invalidates cache and refetch
      queryClient.invalidateQueries("blog")
    }
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  // useEffect(() => {

    // get_singleblog();
    // get_Comments();
    
    // async function abc() {
    //   await Promise.all([
    //     async_get_comments(),
    //     async_get_singleblog()
    //   ])

    // }
    // abc();

  // }, []);

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
                onClick={() => navigate('/blogs')}
                className="md:p-3 p-2 bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white
                 rounded-md">
                Back to All Blogs
              </button>
            </div>
            <div className="m-auto lg:w-[80%] md:w-[90%] w-full relative">
              <img
                className="lg:w-[90%] md:w-[90%] w-full m-auto lg:h-96 md:h-72 h-60 object-cover
                shadow-lg shadow-slate-500 my-8 "
                src={data.res1.data.imgurl}
                onError={(e) => e.target.src = '/myblog.png'}
              />
              <div
                className="absolute flex justify-center items-center
                top-[calc(50vh-24%)] left-[15px]
                md:top-[calc(50vh-10%)] md:left-[37px]
                lg:top-[calc(60vh-20px)] lg:left-[45px]
                ">
                <span>
                  <ReactStars
                    count={5}
                    value={data.res1.data.averageScore}
                    size={25}
                    edit={false}
                    activeColor="#ffc200"
                  />
                </span>
                <span className="text-sm ml-1 mt-0.5 text-gray-600">({data.res1.data.rateCount})</span>
              </div>
            </div>
            <div className="m-auto lg:w-[80%] md:w-[90%] w-full my-2">
              <h1 className="lg:w-[90%] md:w-[90%] w-full m-auto my-1 font-bold text-justify break-words px-2 py-2">
                {data.res1.data.title}
              </h1>
            </div>
            <div
              className="text-justify font-light m-auto lg:w-[80%] md:w-[90%] w-full my-2 px-10"
              dangerouslySetInnerHTML={{ __html: data.res1.data.content }}>
            </div>
            <div className="flex items-center gap-5 m-auto lg:w-[80%] md:w-[90%] w-full my-2 px-10">
              <span className="font-semibold text-xl">Rate This Blog!</span>
              <ReactStars
              count={5}
              value={0}
              size={25}
              onChange={submit_Rate_Mutation.mutate}
              activeColor="#ffc200"
              />
            </div>
            <div className="m-auto lg:w-[80%] md:w-[90%] w-full my-3 flex flex-col justify-center items-center">
              <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="  Enter your comment..."
              rows="5"
              maxLength={200}
              className=" bg-gray-300 focus:outline-none inline-block px-1
               pt-4 rounded-xl lg:w-[90%] md:w-[90%] w-full m-auto my-2"
              />
              <button
                onClick={() => submit_comment_Mutation.mutate()}
                className="md:p-3 p-2 bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white
                rounded-md w-[40%] my-2">
                Submit Comment
              </button>
            </div>
            <div className="border-2 border-gray-600"></div>
            <div className="m-auto lg:w-[80%] md:w-[90%] w-full my-3">
              <h1 className="text-center">Comments</h1>
            </div>
            {data.res2.data.length !== 0 ?
              <>
                {data.res2.data.map(comment => {
                  return (
                    <div className="m-auto lg:w-[80%] md:w-[90%] w-full my-3 grid grid-cols-3 shadow-lg shadow-slate-500
                       bg-gray-300 rounded-md py-2">
                        <div className="flex justify-start items-center gap-2 col-span-1">
                          <a href={`/writer/${comment.user._id}`} className="ml-5">
                            <img
                              className="md:w-[100px] md:h-[100px] w-[70px] h-[70px] rounded-[50%]
                              border-[2px] border-blue-300"
                              src={`http://localhost:4000/${comment.user.avatar}`}
                              onError={(e) => e.target.src = '/account.png'}
                            />
                          </a>
                          <a href={`/writer/${comment.user._id}`} className='text-center'>
                            <span>{comment.user.username}</span>
                          </a>
                        </div>
                        <div className="col-span-2 text-justify flex justify-start items-center px-1 border-l-2
                         border-gray-600">
                          <p className="font-bold w-full text-justify break-words px-2 py-2">
                            {comment.text}
                          </p>
                        </div>
                    </div> 
                  )
                })}
              </>
              :
              <>
                <p className="font-semibold text-xl m-auto lg:w-[80%]
                 md:w-[90%] w-full my-3 text-center py-5 ">
                  There are no comments for this blog
                </p>
              </>
            }
          </div>
        </div>
      
    </>
  );
};

export default Blog;
