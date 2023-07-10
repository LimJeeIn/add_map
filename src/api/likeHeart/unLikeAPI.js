import axios from 'axios';
import { apiURL } from '../apiURL';
//7.2 게시물 좋아요 삭제
export const unLikeAPI = async (postId, token) => {
  try {
    //오류나면 {sendData} 이렇게 감싸보기
    const response = await axios.delete(`${apiURL}post/${postId}/unheart`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('좋아요 삭제하는 API 요청 에러', error);
  }
};
