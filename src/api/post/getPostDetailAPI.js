import axios from 'axios';
import { apiURL } from '../apiURL';

//5.4 게시글상세
export const getPostDetailAPI = async (postId, token) => {
  try {
    const response = await axios.get(`${apiURL}post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('게시물 상세 가져오는 API 요청 에러', error);
  }
};
