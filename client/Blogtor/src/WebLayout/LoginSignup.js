import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Cookies from 'universal-cookie';
import Loading from "../Notfound/Loading";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

const cookies = new Cookies();

const LoginSignup = () => {

  // const navigate = useNavigate()

  const queryClient = useQueryClient();

  const [select_form, setselect_form] = useState(true);
  // Sign up
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  // Login
  // const [login_username, setlogin_username] = useState('');
  const [password, setpassword] = useState('');


  // const sign_up = () => {

  //   if(username.length > 8) return alert('Username must be less than 8 characters')

  //   fetch('http://localhost:4000/user/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify( {
  //       username,
  //       name
  //     })
  //   }).then((res) => res.json())
  //     .then((data) => {

  //       console.log(data)

  //       if (data.token !== undefined) {
  //         cookies.set('token', data.token)
  //         // navigate('/');
  //         window.location.assign('http://localhost:3000')
  //         return alert("You've signed up successfully")
  //       }
  //       else {
  //         if (data.msg === 'this username already exists in the database') {
  //           return alert("You've already signed up. Please login!")
  //         }
  //         else {
  //           return alert("Please complete all sections !")
  //         }
  //       }
  //   } )
  // }
  
  const signup = async () => {

    if(username.length > 8) return alert('Username must be less than 8 characters')

    const {data} = await axios.post("http://localhost:4000/user/signup", {
      username,
      name
    }).catch(error => {
      console.log(error.message)
      alert(`${error.message}`)
      window.location.assign('http://localhost:3000/login')
    })

    if (data.token !== undefined) {
      cookies.set('token', data.token)
      window.location.assign('http://localhost:3000')
      alert("You've signed up successfully")
      return data;
    }
  }

  const login = async () => {
    const {data} = await axios.post("http://localhost:4000/user/login", {
      username,
      password
    }).catch(error => {
      console.log(error.message)
      alert(`${error.message}`)
      window.location.assign('http://localhost:3000/login')
    })

    if (data.token !== undefined) {
      cookies.set('token', data.token)
      window.location.assign('http://localhost:3000')
      alert("You've logged in successfully")
      return data;
    }
  }

  const signup_Mutation = useMutation(signup);
  const login_Mutation = useMutation(login);

  // if (signup_Mutation?.isError) {
   
  //   window.location.assign('http://localhost:3000/login')
  //   return alert(signup_Mutation.error.response.data.msg)
  // }

  // if (login_Mutation.isError) {

  //   window.location.assign('http://localhost:3000/login')
  //   return alert(login_Mutation.error.response.data.msg)
  // }
  
  // const Log_in = () => {
      
  //   fetch('http://localhost:4000/user/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify( {
  //       username,
  //       password
  //     })
  //   }).then((res) => res.json())
  //   .then((data) => {
        
  //     console.log(data);
        
  //     if (data.token !== undefined) {
  //       cookies.set('token', data.token)
  //       // navigate('/');
  //       window.location.assign('http://localhost:3000')
  //       return alert("You've logged in successfully")
  //     }
  //     else {
  //       if (data.msg === 'bad request: no such user exists') {
  //         return alert("Username entered doesnt exist in the database, please sign up !")
  //       }
  //       else if (data.msg === 'password doesnt match') {
  //         return alert("The password entered is incorrect , Please try again !")
  //       }
  //       else {
  //         return alert("Please complete all sections !")
  //       }
  //     }
  //   })
  // } 
  
  return (
  <>
    {/* <Navbar /> */}
    <div className="w-full h-screen relative bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src="./login.jpg"
        alt="/"
      />

      <div className="flex justify-center items-center h-full">
        {select_form ? 
          
            <div className="absolute max-w-[400px] w-full mx-auto bg-gray-200 p-8">
              <h2 className="font-bold text-4xl text-center py-6">Login</h2>
              <div className="flex flex-col my-4">
                <label>Username</label>
                <input
                  className="border relative bg-gray-300 p-2 rounded-md focus:outline-none "
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Password</label>
                <input
                  className="border relative bg-gray-300 p-2 rounded-md focus:outline-none "
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            <button onClick={login_Mutation.mutate} className="rounded-md text-xl w-full
               bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white mt-5 py-3">
                Login
            </button>
            <div className="flex justify-center items-center py-2 mt-3">
              <p className="text-center mr-2 ">
                Don't have an account?
              </p>
              <span className="text-blue-900 font-bold cursor-pointer" onClick={() => setselect_form(false)}>
                Sign up
              </span>
            </div>
              
            </div>
          
          :
          
            <div className="absolute max-w-[400px] w-full mx-auto bg-gray-200 p-8">
              <h2 className="font-bold text-4xl text-center py-6">Sign up</h2>
              <div className="flex flex-col my-4">
                <label>Username</label>
                <input
                  className="border relative bg-gray-300 p-2 rounded-md focus:outline-none "
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  className="border relative bg-gray-300 p-2 rounded-md focus:outline-none "
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button onClick={signup_Mutation.mutate} className="rounded-md text-xl w-full
                bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white mt-5 py-3">
                Sign up
              </button>
              
              <div className="flex justify-center items-center py-2 mt-3">

                <p className="text-center mr-2 ">
                  You have an account already?
                </p>
                <span className="text-blue-900 font-bold cursor-pointer" onClick={() => setselect_form(true)}>
                  Login
                </span>
              
              </div>
            </div>
          
        } 

      </div>
    </div>
  </>);
};

export default LoginSignup;
