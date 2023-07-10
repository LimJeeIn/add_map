import axios from 'axios';
import { apiURL } from '../apiURL';
//7.2 게시물 댓글 불러오기
export const getCommentAPI = async (postId, token) => {
  try {
    //오류나면 {sendData} 이렇게 감싸보기
    const response = await axios.get(`${apiURL}post/${postId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('댓글불러오는 API 요청 에러', error);
  }
};
