import React , {useState , useEffect} from 'react'
import { Link , NavLink , useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import { ImHome } from 'react-icons/im';
import Cookies from 'universal-cookie';
import Loading from '../Notfound/Loading';
import axios from 'axios';
import { useQuery } from 'react-query';

const cookies = new Cookies();

const D_Navbar = () => {

  const [nav, SetNav] = useState(false);
  // const [isloading, setisLoading] = useState(true)
  const [current_user, setcurrent_user] = useState('');
  const [img, setImg] = useState('');

  const [border_b, setborder_b] = useState('translate-x-3');
  const params = useParams();

  const token = cookies.get('token')

  useEffect(() => {
    if (params.id == "mid") {
      setborder_b('translate-x-[185px]')
    }

    if (params.id == "last") {
      setborder_b('translate-x-[360px]')
    }
  } , [params.id])

  // console.log(token)

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
  //       setImg(`http://localhost:4000/${data.avatar}`)
  //       setisLoading(false)
  //     })
  //     // .finally(() => setisLoading(false));
   
  // }

  const myaxios = async () => {
    
    if (token != undefined) {
      const { data } = await axios.post("http://localhost:4000/user/me", {}, {
        headers: {
          "auth": `ut ${token}`
        }
      });
      setImg(`http://localhost:4000/${data.avatar}`)
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
  // console.log(params)

  
 

  // if (isloading) return <Loading />

  const Log_out = () => {
    
    cookies.remove('token')
    window.location.assign('http://localhost:3000')

  }

  // console.log(current_user.avatar)

  return (
    <div className='w-full flex flex-col justify-between items-center pt-5 px-4 
     bg-gradient-to-b from-gray-400 to-gray-200 text-gray-800'>

      <div className='w-full flex justify-between items-center px-4'>
        <div className='lg:pl-20 grid grid-cols-3 gap-2 '>
          <div>
            <img className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-[50%]'
              src={img} onError={(e) => setImg('/account.png')} alt='/'
            />
          </div>
          <div className=' col-span-2 flex flex-col pt-7'>
            <h1>{data.username}</h1>
            <p>{data.name}</p>
          </div>
        </div>
        <div className='hidden  lg:flex  gap-2'>
          <Link to='/'>
            <button className=' border-2 border-gray-800/40 rounded-md py-2 px-4
            font-bold hover:bg-gray-700 hover:text-white'>
             Home page
            </button>
          </Link>
          <button onClick={Log_out} className=' border-2 border-gray-800/40 rounded-md py-2 px-4
           font-bold hover:bg-gray-700 hover:text-white'>
            Log out
          </button>
        </div>
        <div onClick={() =>  SetNav(!nav) } className='lg:hidden z-50 cursor-pointer'>

          {nav ? <AiOutlineClose className="text-black" size={30} /> : <HiOutlineMenuAlt4 size={30} />}
        
        </div>
      </div>

      <div className='w-full h-24 px-4 '>
        <div className='py-2 px-2'>
          <p className='px-[103px] md:px-[155px] lg:px-[233px]  break-words' >{data.bio}</p>
        </div>
      </div>

      <div>
      <div className=' w-full hidden lg:block'>
        <ul className='flex justify-center gap-3'>
          <Link to='/dashbord' onClick={() => setborder_b('translate-x-3')}>
            <li className='  hover:text-black font-medium '>
              YourBlogs
            </li>
          </Link>
          <Link to='createblog/mid' onClick={() => setborder_b('translate-x-[185px]')}>
            <li className=' hover:text-black font-medium'>
              Create blog
            </li>
          </Link>
          <Link to='editprofile/last' onClick={() => setborder_b('translate-x-[360px]')} >
            <li className=' hover:text-black font-medium'>
              Edit profile
            </li>
          </Link>
        </ul>
        </div>
        <div className={`hidden lg:block h-1 bg-gray-700 w-28 ${border_b} duration-500`}></div>
      </div>
      <div className={nav ?
        'absolute text-black z-40 left-0 top-0 w-full h-screen bg-gray-100/90 px-4 py-7 flex flex-col lg:hidden ease-in-out duration-500'
        :
        'absolute left-[-100%]'}>
        <ul>
          <h1 className='mt-[10px] text-[#5651e5]'>BLOGTOR.</h1>
          <li className='border-b border-black'>
            <Link to='/dashbord' className=" flex items-center gap-1">
              <img src="/yourblog.png" className="w-[32px]" />
              <span>YourBlogs</span>
            </Link>
          </li>
          <li className='border-b border-black'>
            <Link to='createblog/mid' className=" flex items-center gap-1">
              <img src="/Createblog.png" className="w-[32px]" />
              <span>Create blog</span>
            </Link>
          </li>
          <li className='border-b border-black'>
            <Link to='editprofile/last' className=" flex items-center gap-1">
              <img src="/editprofile.png" className="w-[32px]" />
              <span>Edit profile</span>
            </Link>
          </li>
          <li className='border-b border-black'>
            <Link to='/' className=" flex items-center gap-2">
              <ImHome size={28} />
              <span>Home</span> 
            </Link>
          </li>
          <li onClick={Log_out} className='border-b border-black cursor-pointer flex items-center gap-1'>
            <BiLogOut size={28} />
            <span>Log out</span>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default D_Navbar;