import axios from 'axios';
import { apiURL } from '../apiURL';

export const likeAPI = async (postId, token) => {
  try {
    const response = await axios.post(
      `${apiURL}post/${postId}/heart`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('게시물 좋아요 에러', error);
  }
};
