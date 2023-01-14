import React , {useState , useEffect} from 'react';
import Loading from '../Notfound/Loading';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery , useMutation , useQueryClient } from 'react-query';

const cookies = new Cookies();

const BlogList = () => {

  // const [isloading, setisLoading] = useState(true);
  // const [blogs, setBlogs] = useState([]);
  const [deleteModal, setdeleteModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null)

  const token = cookies.get('token');
  const queryClient = useQueryClient();

  // const fetchMyBlogs = () => {
  //   fetch('http://localhost:4000/blog/my-blogs', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "auth": `ut ${token}`
  //     },
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setBlogs(data);
  //       setisLoading(false);
  //     })
  // }

  // console.log(blogs)

  const myblog_axios = async () => {   
    
    const { data } = await axios.get("http://localhost:4000/blog/my-blogs", {
      headers: {
        "auth": `ut ${token}`
      }
    });
    return data;
    
  }

  const { data, isLoading, isError, error } = useQuery('myblog', myblog_axios);

  // useEffect(() => {

  //   fetchMyBlogs()

  // }, [])

  // const delete_blog = (blogId) => {
  //   fetch('http://localhost:4000/blog/delete', {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "auth": `ut ${token}`
  //     },
  //     body: JSON.stringify({blogId})
  //   }).then((res) => res.json())
  //     .then(({data}) => {
  //       console.log(data)
  //       // fetchMyBlogs()
  //     })
    
    
  //     setdeleteModal(false)
  // }

  const delete_blog = async (blogId) => {
    
    setdeleteModal(false);

    return await axios.post("http://localhost:4000/blog/delete", {
      blogId
    }, {
      headers: {
        "auth": `ut ${token}`
      }
    })

  }

  const delete_blog_Mutation = useMutation(delete_blog, {
    onSuccess: () => {
      // invalidates cache and refetch
      queryClient.invalidateQueries("myblog")
    }
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)


  // if (isloading) return <Loading />

  return (
    <div className='w-full px-8'>
      <div className=' flex flex-col w-[90%] min-h-[330px] mx-auto px-1 py-3 border-2 border-gray-400/95'>
        <h1 className='text-center py-2 text-3xl md:text-4xl'>Your blogs</h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full py-3 mt-3 place-items-center'>
         
          {data.length !== 0 ?
              
            data.map(blog => {
              return (
                <div className='flex flex-col gap-2 justify-center items-center
                  border-[1px] shadow-md shadow-slate-600 border-gray-400/95 w-[90%] '>
                  <div className='w-[90%] h-48 my-2'>
                    <img
                      src={blog.imgurl}
                      onError={(e) => e.target.src = '/myblog.png'}
                      className='w-full h-full object-cover shadow-md shadow-slate-600'
                    />
                  </div> 
                  <div className='my-2'>
                    <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold'>
                      {blog.title.length > 15 ? blog.title.slice(0, 15) + "..." : blog.title}
                    </h2>
                  </div>
                  <div
                    className='text-center w-[90%]'
                    dangerouslySetInnerHTML={{ __html: blog.content.length > 20 ? blog.content.slice(0,20) + "..." : blog.content }}>
                  </div>
                  <div className='w-[80%] flex justify-center items-center gap-8 my-2'>
                    <button
                      onClick={() => { setdeleteModal(true); setCurrentBlog(blog)}}
                      className=' w-[50%] border-2 border-gray-800/40 rounded-md py-2 px-4
                      font-bold bg-gray-700 text-white hover:bg-gray-200
                    hover:text-gray-700 focus:ring-4 focus:ring-gray-400'
                    >
                      Delete
                    </button>
                    <Link to={`editblog/${blog._id}`} className='w-[50%]'>
                    <button className=' w-[100%] border-2 border-gray-800/40 rounded-md py-2 px-4
                      font-bold bg-gray-700 text-white hover:bg-gray-200
                      hover:text-gray-700 focus:ring-4 focus:ring-gray-400'
                    >
                      Edit
                    </button>
                    </Link>
                  </div>
                </div>
              )
            })
            :

              <p className='md:col-span-2 lg:col-span-3 pt-20'>You have no blogs yet. Create your first blog right now!</p>
            }
          
          </div>
        </div>
        {deleteModal ?
        <>
          <div
            className="bg-gray-800/90 fixed top-0 left-0 w-screen h-screen z-20 "
            onClick={() => { setdeleteModal(false); setCurrentBlog(null) }}>
          </div>
          <div className='bg-gray-200 fixed w-5/6 md:w-2/3 lg:w-1/2 rounded-md
            lg:top-[calc(50vh-17%)] lg:left-[calc(50vw-25%)]
            md:top-[calc(50vh-17%)] md:left-[calc(50vw-32%)]
            top-[calc(50vh-17%)] left-[calc(50vw-42%)]
            mx-auto z-30 flex flex-col justify-center items-center '>
            <div className='my-2'>
              <p className='text-xl lg:text-2xl'>Are you sure delete this blog?</p>
            </div>
            <div className='flex my-3 w-[50%] md:w-[40%] justify-center gap-8 '>
              <button className=' w-[50%] md:w-[40%] border-2 border-gray-800/40 rounded-md py-2 px-2
                font-bold bg-green-700 text-white hover:bg-green-500
               hover:text-black focus:ring-4 focus:ring-green-400'
                onClick={() => delete_blog_Mutation.mutate(currentBlog._id)}
              >
                Yes
              </button>
              <button className=' w-[50%] md:w-[40%] border-2 border-gray-800/40 rounded-md py-2 px-2
                font-bold bg-red-700 text-white hover:bg-red-500
               hover:text-black focus:ring-4 focus:ring-red-800'
               onClick={() => { setdeleteModal(false); setCurrentBlog(null) }}
              >
                Cancel
              </button>
            </div>
          </div>

        </>
        :
        ''
      }
    </div>
  )
}

export default BlogList;