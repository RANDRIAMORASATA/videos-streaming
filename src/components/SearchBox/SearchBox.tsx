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
          // Assurez-vous que `poster` et `link` sont bien des Blob ou des fichiers
          if (video.poster && video.poster instanceof Blob) {
            video.posterLink = convertBlobToUrl(video.poster);
          } else {
            // Si ce n'est pas un Blob, on suppose qu'il s'agit d'une URL valide
            video.posterLink = video.poster;
          }

          if (video.link && video.link instanceof Blob) {
            video.videoLink = convertBlobToUrl(video.link);
          } else {
            // Si ce n'est pas un Blob, on suppose qu'il s'agit d'une URL valide
            video.videoLink = video.link;
          }

          return video;
        });

        // Filter the videos based on the search query
        const filteredVideos = processedVideos.filter((video: Video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Pass filtered videos to the parent component via handleChange
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
    window.scrollTo(0, 0); // Scroll to top on search query change
    fetchData(); // Fetch data whenever the search query changes
  }, [location.search]); // Dependency on location.search ensures this runs when the search query changes

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
