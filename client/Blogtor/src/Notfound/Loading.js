import React from 'react';

import "./loadind.css";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-100/90">
      <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading;