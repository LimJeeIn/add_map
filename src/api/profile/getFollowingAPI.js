import axios from 'axios';
import { apiURL } from '../apiURL';

export const loadFollowingListAPI = async (
  accountName,
  userToken,
  skip,
  limit,
) => {
  try {
    const result = await axios({
      method: 'GET',
      url: `${apiURL}profile/${accountName}/following`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      params: {
        skip: skip,
        limit: limit,
      },
    });
    return result.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
