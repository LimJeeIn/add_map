import axios from 'axios';
import { apiURL } from '../apiURL';
//5.6 게시물(포스트) 삭제
export const deletePostAPI = async (postId, token) => {
  try {
    const response = await axios.delete(`${apiURL}post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('게시글 삭제하는 API 요청 에러', error);
  }
};
