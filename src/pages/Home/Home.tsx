import React, { FC, useEffect, Fragment, useState } from 'react';
import './Home.css';
import Loading from '../../components/Loading/Loading';
import { Video } from '../../models/Video';
import VideoCard from '../../components/VideoCard/VideoCard';
import SearchBox from '../../components/SearchBox/SearchBox';

interface HomeProps {
  handleChange: React.Dispatch<React.SetStateAction<Video[]>>;
}

const Home: FC<HomeProps> = ({ handleChange }) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(false)

  }, [])

  return (
    <Fragment>
      {
        loading ?
          <Loading />
          :
          <div className="Home container py-3 flex">

            <SearchBox
              handleChange={setVideos}
            />
            <div className="row">
              {
                videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))
              }
            </div>


          </div>
      }
    </Fragment>
  );
}

export default Home;