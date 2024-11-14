import React, { FC, useEffect, useState } from 'react';
import './Container.css';
import VideoFormModal from '../VideoFormModal/VideoFormModal';
import { Video } from '../../models/Video';
import { getAllVideo } from '../../api/api-video';
import { convertBlobToUrl } from '../../Helpers/fileHelper';
import ViewVideoModal from '../ViewVideoModal/ViewVideoModal';
import DeleteModalConfirm from '../DeleteModalConfirm/DeleteModalConfirm';
import Upload from '../Upload/Upload';
import { useLocation } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';

interface ContainerProps { }

const Container: FC<ContainerProps> = () => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [displayModalView, setDisplayModalView] = useState<boolean>(false);
  const [displayDeleteConfirmModal, setDisplayDeleteConfirmModal] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<Video | undefined>();
  const [uploadModal, setUploadModal] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);

  interface ApiResponse {
    isSuccess: boolean;
    result: Video[];
  }
  const runLocalData = async () => {
    try {
      const data: any = await getAllVideo();
      console.log('Fetched data:', data);
      if (data.isSuccess && Array.isArray(data.result)) {
        const processedVideos = data.result.map((video: Video) => {
          video.posterLink = convertBlobToUrl(video.poster as Blob);
          video.videoLink = convertBlobToUrl(video.link as Blob);
          return video;
        });
        setVideos(processedVideos);
      } else {
        console.error('Data is not in expected format', data);
      }
    } catch (error) {
      console.error('Failed to fetch videos', error);
    }
  };


  const handleOpenModalView = (video: Video) => {
    setCurrentVideo(video);
    setDisplayModalView(true);
  };
  const handleEdit = (video: Video) => {
    setCurrentVideo(video);
    setDisplayModal(true)
  };
  const handleAdd = () => {
    setCurrentVideo(undefined);
    setDisplayModal(true)
  };
  const handleDelete = (video: Video) => {
    setCurrentVideo(video);
    setDisplayDeleteConfirmModal(true)
  };
  const handleUpload = () => {
    setUploadModal(true);
    setCurrentVideo(undefined);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-2">
      <div className="f-flex gap-2">
        <button className="btn btn-primary py-2 justify-content-between" onClick={handleAdd}>
          Add Video
        </button>
        <button className="btn btn-danger py-2" onClick={handleUpload}>
          Add Many
        </button>
      </div>


      {displayModal && (
        <VideoFormModal
          hideModal={() => setDisplayModal(false)}
          currentVideo={currentVideo}
          updateData={runLocalData}
        />
      )}
      {uploadModal && (
        <Upload
          hideModal={() => setUploadModal(false)}
          updateData={runLocalData}
        />
      )}

      {videos.length !== 0 && (
        <div className="videos-list">
          <table className="table table-bordered py-2">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Poster</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <th scope="row">{video.id}</th>
                  <td>{video.title}</td>
                  <td>
                    <img width={80} src={video.posterLink as string} alt="Video" />
                  </td>
                  <td>{video.category}</td>
                  <td>
                    <button
                      className="btn btn-success m-1"
                      onClick={() => handleOpenModalView(video)}
                    >
                      View
                    </button>
                    <button className="btn btn-primary m-1" onClick={() => handleEdit(video)}>Edit</button>
                    <button className="btn btn-danger m-1" onClick={() => handleDelete(video)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {displayModalView && currentVideo && (
        <ViewVideoModal
          videoId={currentVideo.id!}
          hideModal={() => setDisplayModalView(false)}
        />
      )}
      <SearchBox
        handleChange={setVideos}
      />
      {displayDeleteConfirmModal && currentVideo && (
        <DeleteModalConfirm
          updateData={runLocalData}
          currentVideo={currentVideo}
          hideModal={() => setDisplayDeleteConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default Container;
