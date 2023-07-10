import axios from 'axios';
import { apiURL } from '../apiURL';

export const postCommentAPI = async (postId, commentContent, token) => {
  try {
    //오류나면 {sendData} 이렇게 감싸보기
    const response = await axios.post(
      `${apiURL}post/${postId}/comments`,
      commentContent,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('댓글 업로드 API 요청 에러', error);
  }
};
