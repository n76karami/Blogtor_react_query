import React , {useState , useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import D_Navbar from './D_Navbar';
import Cookies from 'universal-cookie';
import Loading from '../Notfound/Loading';
import axios from 'axios';
import { useQuery } from 'react-query';

const cookies = new Cookies();


const Dashbordlayout = () => {

  const [isloading, setisLoading] = useState(true)
  const [current_user, setcurrent_user] = useState('');

  const token = cookies.get('token')

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
  //     // .finally(() => setisLoading(false));
   
  // }

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

  if(!data) return window.location.assign('/')
  // useEffect(() => {
    
  //   if (token != undefined) {
        
  //     myfetch()
        
  //   }
  //   else {
  //     setisLoading(false) 
  //   }
  
    
  // }, [])
 

  // if (isloading) return <Loading />


  return (
    <>
      <D_Navbar data={data} />
      <Outlet />
    </>
  )
}

export default Dashbordlayout;