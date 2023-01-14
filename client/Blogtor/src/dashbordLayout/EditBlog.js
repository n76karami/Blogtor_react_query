import React, { useEffect , useState , useRef } from 'react';
import { Link  , useParams } from 'react-router-dom';
import Loading from '../Notfound/Loading';
import { Editor } from "@tinymce/tinymce-react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const cookies = new Cookies();

const EditBlog = () => {

  const params = useParams();
  // console.log(params.id);

  const token = cookies.get('token');
  const queryClient = useQueryClient();

  
  const editorRef = useRef(null);

  // const [isloading, setisLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");

  // useEffect(() => {
    
  //   fetch(`http://localhost:4000/blog/single-blog/${params.id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       setTitle(data.title);
  //       setImgUrl(data.imgurl);
  //       setContent(data.content)
  //       setisLoading(false)
  //     })

  // }, [])

  // if (isloading) return <Loading />

  const get_single_blog = async () => {
    
    const { data } = await axios(`http://localhost:4000/blog/single-blog/${params.id}`);
    setTitle(data.title);
    setImgUrl(data.imgurl);
    setContent(data.content)
    return data;
  }

  const { data, isLoading, isError, error } = useQuery('singleblog', get_single_blog);

  // const publish = () => {
    
  //   fetch('http://localhost:4000/blog/edit', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "auth": `ut ${token}`
  //     },
  //     body: JSON.stringify({
  //       blogId: params.id,
  //       data: {
  //         title: title,
  //         content: editorRef.current.getContent(),
  //         imgurl: imgUrl
  //       }
  //     }),
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       window.location.assign('http://localhost:3000/dashbord');
  //       return alert("You successfully edited your blog!");
  //     })

  // }

  const editblog = async () => {

    if (!title || !imgUrl) return alert("Please fill out all inputs!");

    window.location.assign('http://localhost:3000/dashbord');
    alert("You successfully edited your blog!");

    return await axios.post("http://localhost:4000/blog/edit", {
      blogId: params.id,
      data: {
        title: title,
        content: editorRef.current.getContent(),
        imgurl: imgUrl
      }
    }, {
      headers: {
        "auth": `ut ${token}`
      }
    })

  }

  const editblog_Mutation = useMutation(editblog)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  return (  
    <>
      <div className='w-full  text-gray-800 px-8'>
        <div className=' flex flex-col w-[90%]  mx-auto px-1 py-3 border-2 border-gray-400/95'>
          <h1 className='text-center py-2 text-3xl md:text-4xl'>Edit blog</h1>
          <div  className='grid gap-3 lg:gap-28 md:grid-cols-2 mt-4'>
            <div className="mt-2 flex flex-col justify-center gap-2 ">
              <h3 className=' font-medium mb-2 md:pl-10'>Enter your image url</h3>
              <input
                // type="url"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="https://example.com"
                // pattern="https://.*"
                // size="30"
                className="w-full md:w-[250px] lg:w-[350px] mt-2 md:ml-10
                 bg-gray-300 p-2 rounded-md focus:outline-none lg:ml-14"
                //  maxlength="50"
                />
            </div>
            <div className="mt-2 flex flex-col justify-center gap-2 ">
              <h3 className=' font-medium mb-2 md:pl-10'>Enter your title</h3>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                className="w-full md:w-[250px] lg:w-[350px] mt-2 md:ml-10
                 bg-gray-300 p-2 rounded-md focus:outline-none lg:ml-14"
                maxLength="50"
                />
            </div>
          </div>
          <div className='mt-2 py-2 md:px-10'>
            <h3 className=' font-medium mb-3 '>Enter your content</h3>
              <Editor
              className='-z-50 bg-gray-300'
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={content}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                body_class:'h-2'
              }}
            />
            <div className=' text-center my-2 py-2 flex gap-3 justify-center items-center'>
               
              <Link to='/dashbord' className='w-28'> 
                <button className=' w-full border-2 border-gray-800/40 rounded-md py-2 px-4
                  font-bold bg-gray-700 text-white hover:bg-gray-200
                 hover:text-gray-700 focus:ring-4 focus:ring-gray-400'
                  >
                  Back
                </button>
              </Link>

              <button className=' w-28 border-2 border-gray-800/40 rounded-md py-2 px-4
                font-bold bg-gray-700 text-white hover:bg-gray-200
                hover:text-gray-700 focus:ring-4 focus:ring-gray-400'
                onClick={editblog_Mutation.mutate}>
                publish
              </button>

            </div>
          </div>
          
        </div>
        
      </div>
    </>
  )
}

export default EditBlog;