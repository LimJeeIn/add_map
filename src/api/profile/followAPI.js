import axios from 'axios';
import { apiURL } from '../apiURL';

export const followAPI = async (accountname, token) => {
  try {
    const response = await axios.post(
      `${apiURL}profile/${accountname}/follow`,
      {}, // 이 부분에 요청 본문 데이터가 들어가야 합니다. 여기서는 빈 객체 {}를 사용합니다.
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('팔로우 API 요청 에러', error);
  }
};
