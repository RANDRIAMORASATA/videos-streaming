import React, { FC, useEffect, useState } from 'react';
import './SearchBox.css';
import { useLocation } from 'react-router-dom';
import { convertBlobToUrl } from '../../Helpers/fileHelper';
import { getAllVideo } from '../../api/api-video';
import { Video } from '../../models/Video';

interface SearchBoxProps {
  handleChange: React.Dispatch<React.SetStateAction<Video[]>>;
}

const SearchBox: FC<SearchBoxProps> = ({ handleChange }) => {
  const currentSearchParams = new URLSearchParams(window.location.search);
  const searchQuery = currentSearchParams.get('searchVideo') || '';
  const [videos, setVideos] = useState<Video[]>([]);

  const location = useLocation();

  const fetchData = async () => {
    try {
      const data: any = await getAllVideo();
      if (data.isSuccess && Array.isArray(data.result)) {
        const processedVideos = data.result.map((video: Video) => {
          if (video.poster && video.poster instanceof Blob) {
            video.posterLink = convertBlobToUrl(video.poster);
          } else {
            video.posterLink = video.poster;
          }

          if (video.link && video.link instanceof Blob) {
            video.videoLink = convertBlobToUrl(video.link);
          } else {
            video.videoLink = video.link;
          }

          return video;
        });

        const filteredVideos = processedVideos.filter((video: Video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        handleChange(filteredVideos);
        setVideos(filteredVideos);
      } else {
        console.error('Data is not in expected format', data);
      }
    } catch (error) {
      console.error('Failed to fetch videos', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [location.search]);

  return (
    <div className="SearchBox">
      {searchQuery !== '' && (
        <div className="HomeHeader">
          <h2>Search Results</h2>
          <p>Displaying {videos.length} videos matching the search query '{searchQuery}'</p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
