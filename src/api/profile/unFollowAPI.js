import axios from 'axios';
import { apiURL } from '../apiURL';

export const unfollowAPI = async (accountname, token) => {
  try {
    const response = await axios.delete(
      `${apiURL}profile/${accountname}/unfollow`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('언팔로우 API 요청 에러', error);
  }
};
