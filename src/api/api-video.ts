import { slugify } from '../Helpers/stringHelper';
import { Video } from '../models/Video';
import { db } from './database';


export const addVideo = async (video: Video) => {
  try {
    const response = await fetch('http://localhost:8080/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to add video');
    }

    const data = await response.json();
    return {
      isSuccess: true,
      message: "Video added successfully",
      result: data,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding video:', error.message);
      return {
        isSuccess: false,
        error: error.message,
      };
    } else {
      console.error('An unknown error occurred:', error);
      return {
        isSuccess: false,
        error: 'An unknown error occurred.',
      };
    }
  }
};



export const updateVideo = async (video: Video) => {
  try {
    const response = await fetch(`http://localhost:8080/api/videos/${video.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to update video');
    }

    const data = await response.json();
    return {
      isSuccess: true,
      message: "Video updated successfully",
      result: data,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding video:', error.message);
      return {
        isSuccess: false,
        error: error.message,
      };
    } else {
      console.error('An unknown error occurred:', error);
      return {
        isSuccess: false,
        error: 'An unknown error occurred.',
      };
    }
  }
};


export const getVideo = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8080/api/videos/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch video');
    }

    const video = await response.json();
    return {
      isSuccess: true,
      result: video,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding video:', error.message);
      return {
        isSuccess: false,
        error: error.message,
      };
    } else {
      console.error('An unknown error occurred:', error);
      return {
        isSuccess: false,
        error: 'An unknown error occurred.',
      };
    }
  }
};


export const getAllVideo = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/videos', {
      method: 'GET',
      credentials: 'include'
    });


    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    const videos = await response.json();
    return {
      isSuccess: true,
      result: videos,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding video:', error.message);
      return {
        isSuccess: false,
        error: error.message,
      };
    } else {
      console.error('An unknown error occurred:', error);
      return {
        isSuccess: false,
        error: 'An unknown error occurred.',
      };
    }
  }
};


export const deleteVideo = async (_id: number) => {
  try {
    const response = await fetch(`http://localhost:8080/api/videos/${_id}`, {
      method: 'DELETE',
      credentials: 'include',  // Inclure les cookies dans la requête
    });

    if (!response.ok) {
      throw new Error('Failed to delete video');
    }

    return {
      isSuccess: true,
      message: "Video deleted successfully",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding video:', error.message);
      return {
        isSuccess: false,
        error: error.message,
      };
    } else {
      console.error('An unknown error occurred:', error);
      return {
        isSuccess: false,
        error: 'An unknown error occurred.',
      };
    }
  }
};
export const searchVideoBySlug = async (slug: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/videos/search?slug=${slug}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to search video by slug');
    }

    const video = await response.json();
    return {
      isSuccess: true,
      result: video,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding video:', error.message);
      return {
        isSuccess: false,
        error: error.message,
      };
    } else {
      console.error('An unknown error occurred:', error);
      return {
        isSuccess: false,
        error: 'An unknown error occurred.',
      };
    }
  }
};

