import axios from 'axios';
import { apiURL } from '../apiURL';

//5.3 나의 게시글 목록 (내가쓴 게시물 다 가져옴)
export const getProfilePostAPI = async (accountname, token) => {
  try {
    const response = await axios.get(`${apiURL}post/${accountname}/userpost`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('내 게시물 가져오기 API 요청 에러', error);
  }
};
