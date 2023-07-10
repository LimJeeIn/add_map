import axios from 'axios';
import { apiURL } from '../apiURL';

export const loadFollowerListAPI = async (
  accountName,
  userToken,
  skip,
  limit,
) => {
  try {
    const res = await axios.get(`${apiURL}profile/${accountName}/follower`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-type': 'application/json',
      },
      params: {
        skip: skip,
        limit: limit,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
