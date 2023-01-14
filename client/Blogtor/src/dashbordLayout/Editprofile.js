import React , {useState , useEffect} from 'react';
import Loading from '../Notfound/Loading';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

const cookies = new Cookies();

const Editprofile = () => {

  const [isloading, setisLoading] = useState(true);
  // const [current_user, setcurrent_user] = useState('');

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [img, setImg] = useState('');
  const [file, setFile] = useState(null)

  const token = cookies.get('token');

   useEffect(() => {
    if (file) {

      const fileReader = new FileReader()

      fileReader.onload = function (e) {
        setImg(e.target.result)
      }

      fileReader.readAsDataURL(file)
    }
  }, [file])

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
  //       setName(data.name);
  //       setBio(data.bio)
  //       setImg(`http://localhost:4000/${data.avatar}`)
  //       setisLoading(false)
  //     })
   
  // }

  const myaxios = async () => {
    
    if (token != undefined) {
      const { data } = await axios.post("http://localhost:4000/user/me", {}, {
        headers: {
          "auth": `ut ${token}`
        }
      });
      setName(data.name);
      setBio(data.bio)
      setImg(`http://localhost:4000/${data.avatar}`)
      return data;
    }
  }

  const { data, isLoading, isError, error } = useQuery('me', myaxios);

  // useEffect(() => {
    
  //   if (token != undefined) {
        
  //     myfetch()
        
  //   }
  //   else {
  //     setisLoading(false) 
  //   }
  
    
  // }, [])

  // if (isloading) return <Loading /> 

  // console.log(name);
  // console.log(img);

  const submit_avatar = async () => {
    try {
      
      console.log(file)

      if (!file) return

      const formData = new FormData()
      formData.append('avatar', file)

      fetch('http://localhost:4000/user/update-avatar', {
        method: 'POST',
        headers: {
          'auth': `ut ${token}`
        },
        body: formData
      }).then(res => {
        console.log(res)
        
      }).then((data) => {
        console.log(data)
      })

    } catch (error) {
      console.log('lol')
    }
  }

  // const submit_info = () => {
  //   fetch('http://localhost:4000/user/edit', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth': `ut ${token}`
  //     },
  //     body: JSON.stringify({
  //       name,
  //       bio,
  //     }),
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       submit_avatar()
  //       window.location.assign('http://localhost:3000/dashbord')
  //     })
  // }

  const submit_form = async () => {
    const {data} = await axios.post("http://localhost:4000/user/edit", {
      name,
      bio,
    }, {
      headers: {
        'auth': `ut ${token}`
      }
    })
    submit_avatar()
    window.location.assign('http://localhost:3000/dashbord')
    return data;
  }

  const submit_form_Mutation = useMutation(submit_form);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  return (
    <div className='w-full  text-gray-800 px-8'>
      <div className=' flex flex-col w-[90%]  mx-auto px-1 py-3 border-2 border-gray-400/95'>
        <h1 className='text-center py-2 text-3xl md:text-4xl'>Edit profile</h1>
        <div className='mt-2 py-2'>
          <h3 className=' font-medium mb-3 md:pl-10'>change your avatar</h3>
          <div className='flex flex-col justify-center items-center'>
            <div>
              <img
                className="mb-4 w-52 h-52 rounded-full "
                src={img}
                onError={(e) => setImg('/account.png')}
              />
            </div>
            <div className='w-full flex justify-center items-center gap-3 py-3'>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-[50%] md:w-[200px]"
                name="avatar"
                accept="image/png, image/jpeg"
              />
              {/* <button onClick={submit_avatar}>s_avatar</button> */}
              <button
                onClick={() => { setImg('/account.png') } }
                className=' w-[40%] md:w-[200px] border-2 border-gray-800/40
                  rounded-md py-1 px-3
                  font-bold bg-gray-700 text-white hover:bg-gray-200
                  hover:text-gray-700
                  focus:ring-4 focus:ring-gray-400'>
                Delete avatar
              </button>
            </div>
          </div>
        </div>
        <div className='py-2'>
          <h3 className=' font-medium mb-3 md:pl-10'>change your information</h3>
          <div className='grid gap-3 md:grid-cols-2'>
            <div className='flex flex-col justify-center  gap-2 md:pl-28'>
              <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                className='w-full md:w-2/3 mt-2 bg-gray-300 p-2 rounded-md focus:outline-none'
              />
              <p className='px-2 md:w-2/3 text-sm mt-[-10px]'>name</p>
            </div>
            <div className='flex flex-col gap-2 md:pl-28'>
              <textarea
                type='text'
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder='Bio'
                className='w-full md:w-[80%] mt-2 bg-gray-300 p-2 rounded-md focus:outline-none'
                maxLength="200"
                rows="5"
              />
              <p className='px-2 md:w-[80%] text-sm mt-[-10px]'>bio</p>
            </div>
          </div>
          <div className='text-center my-2 py-2'>
            <button className=' border-2 border-gray-800/40 rounded-md py-2 px-4
              font-bold bg-gray-700 text-white hover:bg-gray-200 hover:text-gray-700 focus:ring-4 focus:ring-gray-400'
              onClick={submit_form_Mutation.mutate}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editprofile;