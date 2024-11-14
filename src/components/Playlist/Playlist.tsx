import React, { FC, useEffect, useState } from 'react';
import './Playlist.css';
import { Video } from '../../models/Video';
import { getAllVideo } from '../../api/api-video';
import { convertBlobToUrl } from '../../Helpers/fileHelper';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import Loading from '../Loading/Loading'; // Assurez-vous d'avoir ce composant

interface PlaylistProps {
  videoId: number
}

const Playlist: FC<PlaylistProps> = ({ videoId }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const runLocalData = async () => {
    try {
      const data: any = await getAllVideo();
      console.log("--------------PLAYLIST" + data)
      if (data.isSuccess && Array.isArray(data.result)) {
        console.log(data.result)
        const processedVideos = data.result.map((video: Video) => {
          video.posterLink = convertBlobToUrl(video.poster as Blob);
          video.videoLink = convertBlobToUrl(video.link as Blob);
          return video;
        });
        setVideos(processedVideos);
        console.log("--------------PRECESSVIDEO" + processedVideos)
      } else {
        console.error('Data is not in expected format', data);
      }
    } catch (error) {
      console.error('Failed to fetch videos', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    runLocalData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Playlist">
      {videos.map((video: Video) => (
        <PlaylistItem key={video.id} video={video} currentVideoId={videoId} />
      ))}
    </div>
  );
};

export default Playlist;
