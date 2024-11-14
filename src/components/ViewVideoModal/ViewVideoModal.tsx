import React, { FC, useEffect, useState } from 'react';
import './ViewVideoModal.css';
import { Button, Modal } from 'react-bootstrap';
import { Video } from '../../models/Video';
import { getVideo } from '../../api/api-video';
import Loading from '../Loading/Loading';
import { convertBlobToUrl } from '../../Helpers/fileHelper';
import { OuitubePlayer } from 'ouitube-player';

interface ViewVideoModalProps {
  videoId: number;
  hideModal: () => void;
}

const ViewVideoModal: FC<ViewVideoModalProps> = ({ videoId, hideModal }) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const runLocalData = async () => {
    const data: any = await getVideo(videoId);
    if (data.isSuccess) {
      const currentVideo = data.result
      currentVideo.poster = convertBlobToUrl(currentVideo.poster as Blob)
      currentVideo.link = convertBlobToUrl(currentVideo.link as Blob)
      setVideo(data.result);
    } else {
      console.error('Failed to fetch video', data.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    runLocalData();
  }, [videoId]);

  return (
    <div className="ViewVideoModal">
      <Modal show={true} size="lg" scrollable>
        <Modal.Header>
          <Modal.Title>View Video</Modal.Title>
          <Button className="btn-close" onClick={hideModal}></Button>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <Loading />
          ) : video ? (
            <table className="table table-bordered">

              <tbody>
                <tr>
                  <th>Titre</th>
                  <th>{video.title}</th>
                </tr>
                <tr>
                  <th>Description</th>
                  <th>{video.description}</th>
                </tr>
                <tr>
                  <th>Category</th>
                  <th>{video.category}</th>
                </tr>
                <tr>
                  <th>Poster</th>
                  <th><img src={video.poster as string} alt={video.title} className='img-fluid' /></th>
                </tr>
                <tr>
                  <th>Video</th>
                  <th><OuitubePlayer src={video.link as string} /></th>
                </tr>
              </tbody>

            </table>
          ) : (
            <p>Error: Failed to load video</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="success">Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewVideoModal;
