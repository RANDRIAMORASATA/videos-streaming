
import React, { FC, useEffect, useState } from 'react';
import './Upload.css';
import { Button, Modal } from 'react-bootstrap';
import FileDrop from '../FileDrop/FileDrop';
import { convertFileToBlob, linkToBlob } from '../../Helpers/fileHelper';
import { Video } from '../../models/Video';
import Loading from '../Loading/Loading';
import { addVideo } from '../../api/api-video';

interface UploadProps {
  hideModal: () => void;
  updateData: () => void;
}

const Upload: FC<UploadProps> = ({ hideModal, updateData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileDrop = async (files: File[]) => {
    setIsLoading(true);
    console.log(files);
    try {
      const processVideos = await Promise.all(
        files.map(async (file) => {
          const fileNameParts = file.name.split('.');
          const extension = fileNameParts.pop();
          const title = fileNameParts.join('');
          const videoBlob = await convertFileToBlob(file);
          const imageLink = window.origin + '/assets/images/01.jpg';
          const posterBlob = await linkToBlob(imageLink);

          const video: Video = {
            title: title,
            description: title,
            poster: posterBlob,
            category: 'divers',
            link: videoBlob,
            isAvailable: true, // Add this line
            createdAt: new Date(),
          };
          await addVideo(video);
          console.log(video);
        })
      );
      updateData();
      hideModal();
    } catch (error) {
      console.error('une erreur se produit lors des traitements des fichiers');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      // Local data handling logic
    };
    runLocalData();
  }, []);

  return (
    <div className="Upload">
      <Modal show={true} size="lg" scrollable centered>
        <Modal.Header>
          <Modal.Title>Upload Video</Modal.Title>
          <Button className="btn-close" onClick={hideModal}></Button>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? <Loading /> : <FileDrop onFileDrop={handleFileDrop} />}
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

export default Upload;
