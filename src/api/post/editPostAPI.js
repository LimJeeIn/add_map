import axios from 'axios';
import { apiURL } from '../apiURL';
//5.5 게시물 수정
export const editPostAPI = async (postId, sendData, token) => {
  try {
    const response = await axios.put(`${apiURL}post/${postId}`, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('게시글 수정하는 API 요청 에러', error);
  }
};
