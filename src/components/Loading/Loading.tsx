
import React, { FC, useEffect } from 'react';
import './Loading.css';


interface LoadingProps {

}


const Loading: FC<LoadingProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="Loading">
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Loading;