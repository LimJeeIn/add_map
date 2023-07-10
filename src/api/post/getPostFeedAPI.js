import axios from 'axios';
import { apiURL } from '../apiURL';
// 5.2 팔로잉 게시글 목록(피드)
const getPostFeedAPI = async (token, skip, limit) => {
  try {
    const response = await axios.get(
      `${apiURL}post/feed/?limit=${limit}&skip=${skip}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );
    return response.data.posts;
  } catch (error) {
    console.log('팔로잉 게시글 목록 API 요청 오류', error);
    return null;
  }
};

export default getPostFeedAPI;
