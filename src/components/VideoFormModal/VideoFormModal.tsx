import React, { FC, useEffect, useState } from 'react';
import './VideoFormModal.css';
import { db } from '../../api/database';
import { Button, Modal } from 'react-bootstrap';
import { Video } from '../../models/Video';
import { convertFileToBlob, convertFileToLink } from '../../Helpers/fileHelper';
import { addVideo, updateVideo } from '../../api/api-video'; // Assuming you have an updateVideo function in your api-video file
import Loading from '../Loading/Loading';
import { slugify } from '../../Helpers/stringHelper';
import { useDispatch } from 'react-redux';
import { emitNotification } from '../../Helpers/notificationHelpers';
import { ADD } from '../../redux/reducers/types/actions';

interface VideoFormModalProps {
  hideModal: () => void;
  currentVideo?: Video;
  updateData: () => void;
}

const VideoFormModal: FC<VideoFormModalProps> = ({ currentVideo, hideModal, updateData }) => {
  const dispatch = useDispatch()
  const [formError, setFormError] = useState<Record<string, string>>({});
  const [posterPreview, setPosterPreview] = useState<string>(currentVideo?.posterLink || '');
  const [videoPreview, setVideoPreview] = useState<string>(currentVideo?.videoLink || '');
  const [formSubmitError, setFormSubmitError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<Video>(currentVideo || {
    title: '',
    description: '',
    poster: null,
    link: null,
    category: '',
    isAvailable: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!currentVideo) {
      setFormData({
        title: '',
        description: '',
        poster: null,
        link: null,
        category: '',
        isAvailable: true,
      });
    }
  }, [currentVideo]);

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const newValue: any = { ...formData };
    const errors = { ...formError };
    delete errors[name];
    setFormError(errors);

    if (type === 'checkbox') {
      newValue[name] = (event.target as HTMLInputElement).checked;
    } else if (type === 'file') {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const link = await convertFileToLink(file);
      if (name === 'poster' && file.type.startsWith('image/')) {
        setPosterPreview(link);
      }
      if (name === 'link' && file.type.startsWith('video/')) {
        setVideoPreview(link);
      }
      newValue[name] = file;
    } else {
      newValue[name] = value;
    }
    setFormData(newValue);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }
    if (!formData.poster && !currentVideo) {
      errors.poster = 'Poster File is required';
    }
    if (!formData.link && !currentVideo) {
      errors.link = 'Video File is required';
    }
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      setIsSubmitted(true);
      let video: Video = { ...formData };
      //video.slug = slugify(video.title); // Générer le slug ici
  
      console.log('Submitting video:', video);
  
      if (currentVideo) {
        if (formData.poster instanceof File) {
          video.poster = await convertFileToBlob(formData.poster as File);
        }
        if (formData.link instanceof File) {
          video.link = await convertFileToBlob(formData.link as File);
        }
        delete video?.posterLink;
        delete video?.videoLink;
        video.updatedAt = new Date();
        let result = await updateVideo(video);
        console.log('Update result:', result);
        if (result?.isSuccess) {
          updateData();
          hideModal();
        }
      } else {
        video.poster = await convertFileToBlob(formData.poster as File);
        video.link = await convertFileToBlob(formData.link as File);
  
        const result = await addVideo(video);
        console.log('Add result:', result);
        if (result?.isSuccess) {
          setFormData({
            title: '',
            description: '',
            poster: null,
            link: null,
            category: '',
            isAvailable: true,
          });
          updateData();
          hideModal();
          if(currentVideo){
            emitNotification(dispatch, 'Video modifié', ADD, 'success')
          }else {
            emitNotification(dispatch, 'Video ajouté', ADD, 'success')
          }
          
        }
      }
    } catch (error) {
      setFormSubmitError('Erreur lors de la soumission, essayez à nouveau !');
      console.error("Error in handleSubmit:", error);
      emitNotification(dispatch, 'Please try again', ADD, 'danger')
    }
    setIsSubmitted(false);
  };
  

  return (
    <div className="VideoFormModal">
      <Modal show={true} size="xl" scrollable>
        <Modal.Header>
          <Modal.Title>Video Form</Modal.Title>
          <Button className="btn-close" onClick={hideModal}></Button>
        </Modal.Header>
        <Modal.Body>
          {isSubmitted ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit}>
              {formSubmitError && <div className="text-danger">{formSubmitError}</div>}
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className={`form-control ${formError.title ? 'is-invalid' : ''}`}
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {formError.title && <div className='invalid-feedback'>{formError.title}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className={`form-control ${formError.description ? 'is-invalid' : ''}`}
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {formError.description && <div className='invalid-feedback'>{formError.description}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="poster">Image (poster)</label>
                <input
                  type="file"
                  className={`form-control ${formError.poster ? 'is-invalid' : ''}`}
                  name="poster"
                  onChange={handleInputChange}
                  accept='image/*'
                />
                {posterPreview && (
                  <div className="preview-image">
                    <img src={posterPreview} alt="imagePreview" className='img-fluid' width={"100%"} />
                  </div>
                )}
                {formError.poster && <div className='invalid-feedback'>{formError.poster}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="link">Video</label>
                <input
                  type="file"
                  className={`form-control  ${formError.link ? 'is-invalid' : ''}`}
                  name="link"
                  onChange={handleInputChange}
                  accept='video/*'
                />
                {videoPreview && (
                  <div className="video-preview card my-1">
                    <video controls width={'100%'} height={"50%"}>
                      <source src={videoPreview} type="video/mp4" />
                      <p>VIDEO</p>
                    </video>
                  </div>
                )}
                {formError.link && <div className='invalid-feedback'>{formError.link}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  className={`form-control ${formError.category ? 'is-invalid' : ''}`}
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select video category</option>
                  <option value="Politique">Politique</option>
                  <option value="Education">Education</option>
                  <option value="Société">Société</option>
                  <option value="Culture">Culture</option>
                  <option value="Formation">Formation</option>
                </select>
                {formError.category && <div className='invalid-feedback'>{formError.category}</div>}
              </div>
              <div className="form-check form-switch">
                <input
                  className={`form-check-input ${formError.isAvailable ? 'is-invalid' : ''}`}
                  type="checkbox"
                  checked={formData.isAvailable}
                  name="isAvailable"
                  id="isAvailable"
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="isAvailable">
                  Disponible
                </label>
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={hideModal}>
                  Cancel
                </Button>
                {currentVideo ? 
                  <Button variant="warning" type="submit">Update</Button> :
                  <Button variant="success" type="submit">Save</Button>
                }
              </Modal.Footer>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VideoFormModal;
