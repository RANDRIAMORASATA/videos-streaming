
import React, { FC, useEffect, Fragment, useState } from 'react';
import './Account.css';
import Loading from '../../components/Loading/Loading';
import Container from '../../components/Container/Container';



interface AccountProps {

}


const Account: FC<AccountProps> = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

      setLoading(false)
    }
    runLocalData()
  }, [])

  return (
    <Fragment>
      {
        loading ?
          <Loading />
          :
          <Container />
      }
    </Fragment>
  );
}

export default Account;