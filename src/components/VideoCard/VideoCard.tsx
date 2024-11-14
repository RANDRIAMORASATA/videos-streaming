
import React, { FC, useEffect } from 'react';
import './VideoCard.css';
import { Video } from '../../models/Video';
import { Link } from 'react-router-dom';


interface VideoCardProps {
  video: Video
}


const VideoCard: FC<VideoCardProps> = ({ video }) => {
  const posterUrl = video.posterLink || 'path_to_default_image.jpg';
  return (

    <div className="VideoCard col-lg-4 col-md-6 p-2" key={video.id}>
      <Link to={'/reader/' + video.id} className="card">
        <div className="card">
          <img src={posterUrl} alt={video.title} className='card-img-top' />
          <div className="card-body">
            <h5 className='card-title'>{video.title}</h5>
            <p className="card-text">{video.description}</p>
            <p className="card-text">Created At: {video?.createdAt?.toDateString()}</p>
          </div>
        </div>
      </Link>
    </div>

  );
}

export default VideoCard;