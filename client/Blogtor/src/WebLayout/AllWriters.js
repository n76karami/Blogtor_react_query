import React, { useState, useEffect } from "react";
import Loading from "../Notfound/Loading";
import WriterCard from "./WriterCard";

import "./AllWriters.css";
import axios from "axios";
import { useQuery } from "react-query";

const AllWriters = () => {
  // const [writers, setWriters] = useState("");
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("http://localhost:4000/user/", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data)
  //       setWriters(data);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) return <Loading />;

  const getAllwriters = async () => {
    const { data } = await axios("http://localhost:4000/user/");
    return data;
  }

  const { data, isLoading, isError, error } = useQuery("writers", getAllwriters);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  return (
    <>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <div className="w-full h-screen relative px-8">
        <div
          className="absolute top-[calc(50vh-37%)] left-[calc(50vw-45%)]
           flex flex-col w-[90%] mx-auto px-1 py-3"
        >
          <h1 className="text-center text-gray-100">All Writers</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full py-3 mt-3 place-items-center">
            {data.length !== 0 ? (
              data.map((writer) => {
                return <WriterCard writer={writer} />;
              })
            ) : (
              <p className="font-semibold md:col-span-2 lg:col-span-3 pt-20">
                No Writers signed up yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllWriters;
