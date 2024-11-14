/*
  Author: Mudey Formation
  Website: https://mudey.fr/
  App Name: E-commerce with React.Js
  Created At: 20/06/2024 01:12:26
*/
import React, { FC, useEffect, useState } from 'react';
import './MediaReader.css';
import Loading from '../Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { OuitubePlayer } from 'ouitube-player';
import { convertBlobToUrl } from '../../Helpers/fileHelper';
import { Video } from '../../models/Video';
import Playlist from '../Playlist/Playlist';
import { searchVideoBySlug } from '../../api/api-video';

interface MediaReaderProps { }

const MediaReader: FC<MediaReaderProps> = () => {
  const [loading, setLoading] = useState(true);
  const [errorPage, setErrorPage] = useState(false);
  const [video, setVideo] = useState<Video | undefined>();
  let { slug } = useParams();
  const navigate = useNavigate()
  //videoId = parseInt(videoId)
  //console.log(params)

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      if (slug) {
        try {

          const data: any = await searchVideoBySlug(slug);
          // Handle data as needed
          //console.log({data})
          if (data.isSuccess) {
            const currentVideo = data.result
            currentVideo.posterLink = convertBlobToUrl(currentVideo.poster as Blob);
            currentVideo.videoLink = convertBlobToUrl(currentVideo.link as Blob);
            setVideo(currentVideo)
          } else {
            setErrorPage(true)
          }
        } catch (error) {
          setErrorPage(true)
          console.error('Error fetching video', error);
        }
      }
      setLoading(false);
    };
    runLocalData();
  }, [slug]);

  if (errorPage) {
    navigate('/error')
  }

  return (
    <div className="container-fluid ">
      {
        loading ? <Loading /> :
          video ?
            <div className="MediaReader p-2">
              <div className="media-content">
                <div className="row">
                  <div className="col-md-9 ">
                    <OuitubePlayer src={video.videoLink as string} />
                    <h2>{video.title}</h2>
                    <div className="video-description p-2">
                      {video.description}
                    </div>
                  </div>
                  <div className="col-md-3 ">
                    <Playlist
                      videoId={video.id!} />
                  </div>
                </div>

              </div>
            </div> :
            null
      }
    </div>
  );
};

export default MediaReader;
