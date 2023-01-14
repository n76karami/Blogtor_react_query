import React from 'react';
import ReactStars from "react-rating-stars-component";


const WriterCard = ({ writer }) => {

  console.log(writer);

  return (
    <div
      className="relative mt-2 flex flex-col gap-2 justify-center items-center bg-gray-200 
      shadow-lg shadow-slate-600 rounded-[8px]  w-[90%] "
    >
      <div className='py-2'>
        <a href={`writer/${writer._id}`}>
          <img
            className="md:w-[250px] md:h-[250px] w-[150px] h-[150px] shadow-lg shadow-slate-600 rounded-[50%] border-[2px] border-blue-300"
            src={`http://localhost:4000/${writer.avatar}`}
            onError={(e) => (e.target.src = "/account.png")}
            alt="/"
          />
        </a>
      </div>
      <div className="py-3 ">
        <h1>{writer.name}</h1>
      </div>
      <div className="w-full flex justify-between px-2 py-3">
        <ReactStars
          count={5}
          value={writer.averageScore}
          size={20}
          edit={false}
          activeColor="#ffc200"
        />
        <a href={`writer/${writer._id}`} className='w-2/5'>
          <button className=" bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white
          py-2 w-full px-3 font-semibold
          rounded-md">
          View Profile
          </button>
        </a>
      </div>
    </div>
  );
}

export default WriterCard;