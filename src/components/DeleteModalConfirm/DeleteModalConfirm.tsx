import React, { FC, useEffect } from 'react';
import './DeleteModalConfirm.css';
import { Button, Modal } from 'react-bootstrap';
import { deleteVideo } from '../../api/api-video';
import { Video } from '../../models/Video';

interface DeleteModalConfirmProps {
  hideModal: () => void;
  updateData: () => void;
  currentVideo: Video;
}

const DeleteModalConfirm: FC<DeleteModalConfirmProps> = ({ hideModal, updateData, currentVideo }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = async () => {
    if (!currentVideo || !currentVideo.id) {
      console.error('Invalid video data:', currentVideo);
      return;
    }
    try {
      await deleteVideo(currentVideo.id);
      updateData();
      hideModal();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div className="DeleteModalConfirm">
      <Modal show={true} size="lg" scrollable>
        <Modal.Header>
          <Modal.Title>Confirmez si vous voulez vraiment supprimer</Modal.Title>
          <Button className="btn-close" onClick={hideModal}></Button>
        </Modal.Header>
        <Modal.Body>
          <p>
            Est-ce que vous êtes sur de votre action? Pour supprimer la vidéo <strong>{currentVideo.title}</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModalConfirm;
