import React, { useContext, useEffect, useState } from "react";
import { BsPerson } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import { ImHome } from 'react-icons/im';
import { ImBlog } from 'react-icons/im';
import { Link } from "react-router-dom";

import Cookies from 'universal-cookie';
import Loading from "../Notfound/Loading";
import axios from "axios";
import { useQuery } from "react-query";

const cookies = new Cookies();

const Navbar = () => {

  const [nav, SetNav] = useState(false);
  const [modal, SetModal] = useState(false);
  // const [modalMobile, SetmodalMobile] = useState(false);
  // const [isloading, setisLoading] = useState(true)
  // const [current_user, setcurrent_user] = useState('')

  const token = cookies.get('token')

  console.log(token)


  // const myfetch = () => {

  //   fetch('http://localhost:4000/user/me' , {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "auth": `ut ${token}`
  //     },
  //     body: JSON.stringify({})
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       setcurrent_user(data)
  //       setisLoading(false)
  //     })
  // }

  const Log_out = () => {
    
    cookies.remove('token')
    window.location.assign('http://localhost:3000')

  }

  const myaxios = async () => {
    
    if (token != undefined) {
      const { data } = await axios.post("http://localhost:4000/user/me", {}, {
        headers: {
          "auth": `ut ${token}`
        }
      });
    
      return data;
    }
  }

  const { data, isLoading, isError, error } = useQuery('me', myaxios);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)
  
  // useEffect(() => {
    
  //   if (token != undefined) {
        
  //     myfetch()
        
  //   }
  //   else {
  //     setisLoading(false) 
  //   }
  
  // }, [])

  // if (isloading) return <Loading />
  // console.log(current_user)

  return (
  <>  
    <div className="fixed z-50 w-full flex justify-between items-center h-20 px-4
     bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white ">
      <div>
        <h1 className="text-[#00df9a]">BLOGTOR.</h1>
      </div>
      <div className="text-center w-96">
        <ul className="hidden md:flex">
          <Link to='/'><li>Home</li></Link>
          <Link to='blogs'><li>Blogs</li></Link>
          <Link to='writers'><li>Writers</li></Link>
        </ul>
      </div>  
      
      <div className="hidden md:flex px-7 mr-5 cursor-pointer">
        {data ? 
          <>
            <div onClick={()=>SetModal(!modal)} className="flex flex-col justify-center items-center">
              <BsPerson size={20} />
              <span>{data.username}</span>
            </div>
          </>
          :
          <>
            <Link to='login'>
              <button className="border-2 font-bold p-3  border-gray-300 rounded-md
              hover:bg-gray-200 hover:text-[#5651e5] hover:border-[#5651e5] ">
                Sign up / Login
              </button>
            </Link>
          </>
        }
        
      </div>
      
        <div onClick={() => {
          SetNav(!nav);
        }} className='md:hidden z-10 cursor-pointer'>

        {nav ? <AiOutlineClose className="text-black" size={30} /> : <HiOutlineMenuAlt4 size={30} />}
        
      </div>
      <div className={nav ?
        'absolute text-black left-0 top-0 w-full h-screen bg-gray-100/90 px-4 py-7 flex flex-col md:hidden ease-in-out duration-500' :
        'absolute left-[-100%]'}>
        <ul>
          <h1 className='mt-[-8px] text-[#5651e5]'>BLOGTOR.</h1>
            <li className='border-b border-black'>
              <Link to='/' className=" flex items-center gap-2">
                <ImHome />
                <span>Home</span>
              </Link>
            </li>
            <li className='border-b border-black'>
              <Link to='blogs'  className=" flex items-center gap-2">
                <ImBlog />
                <span>Blogs</span>
              </Link>
            </li>
            <li className='border-b border-black'>
              <Link to='writers'  className=" flex items-center gap-1">
                <img src="./writers.png" className="w-[20px]" />
                <sapn>Writers</sapn>
              </Link>
            </li>
          {data ? 
            <>
              
                <li className='border-b border-black'>
                  <Link to='/dashbord'   className=" flex items-center gap-1">
                    <img src="./dashbord.png" className="w-[20px]" />
                    <span>Dashbord</span>
                  </Link>
                </li>
                <li onClick={Log_out} className='cursor-pointer flex items-center gap-2'>
                  <BiLogOut size={20} />
                  <span>Log out</span>
                </li>

            </>
            :
            <>
              <div className='flex flex-col'>
                <Link to='login'>
                  <button className='w-full font-bold my-10 p-3 border border-gray-300 rounded-md
                    bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white'>
                    Sign up / Login
                  </button>
                </Link>
              </div>
            </>
          }
          
        </ul>
      </div>
    </div>
    {modal ?
      <>
        <div className=" hidden md:flex bg-[#709dff] text-white mr-2
           flex-col justify-center items-center gap-5
          fixed w-28 h-24 top-24 right-3 z-50">
            <Link to="/dashbord" className="cursor-pointer hover:bg-[#5651e5] w-full text-center">
              <span>
                Dashbord
              </span>
            </Link>
          <span onClick={Log_out} className="cursor-pointer hover:bg-[#5651e5] w-full text-center">Logout</span>
        </div>
      </>
      :
      ''
    }
</> );
};

export default Navbar;
