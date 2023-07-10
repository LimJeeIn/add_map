import axios from 'axios';
import { apiURL } from '../apiURL';

export const getProfileAPI = async (accountname, token) => {
  const accessToken = `Bearer ${token}`;

  try {
    const response = await axios.get(`${apiURL}profile/${accountname}`, {
      headers: {
        Authorization: accessToken,
        'Content-type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 404) {
      console.error('해당 계정이 존재하지 않습니다.');
    } else {
      console.error('프로필 불러오기에 실패했습니다.', error);
    }
    return null;
  }
};
