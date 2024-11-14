import React, { FC, useEffect } from 'react';
import './PlaylistItem.css';
import { Video } from '../../models/Video';
import { Link } from 'react-router-dom';

interface PlaylistItemProps {
  video: Video;
  currentVideoId: number
}

const PlaylistItem: FC<PlaylistItemProps> = ({ currentVideoId, video }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log({ video })

  }, []);

  return (
    <div className="PlaylistItem">
      <Link to={'/reader/' + video.id}
        className={currentVideoId == video.id ?
          "row bordered p-1 current" : "row bordered p-1 "}
      >
        <div className="col-md-4">
          <img
            width="100%"
            src={video.posterLink as string}
            alt="Video"
          />
        </div>
        <div className="col-md-8">
          <h2>{video.title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistItem;
