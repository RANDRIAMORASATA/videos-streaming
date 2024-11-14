
import React, { FC, useEffect, Fragment, useState } from 'react';
import './ErrorPage.css';

interface ErrorPageProps {

}


const ErrorPage: FC<ErrorPageProps> = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  }, [])

  return (
    <Fragment>
      <div className="ErrorPage">
        <h1>Error 404</h1>
        <p>page nout found</p>
      </div>
    </Fragment>
  );
}

export default ErrorPage;