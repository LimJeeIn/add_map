import axios from 'axios';
import { apiURL } from '../apiURL';
// 2.3 프로필  정보  불러오기
export const getMyInfoAPI = async (token) => {
  try {
    const response = await axios.get(`${apiURL}user/myinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log('프로필 정보 불러오기 API 요청 오류', error);
    return null;
  }
};
