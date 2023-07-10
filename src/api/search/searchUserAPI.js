import axios from 'axios';
import { apiURL } from '../apiURL';

export const searchUserAPI = async (token, keyword) => {
  try {
    const response = await axios.get(
      `${apiURL}user/searchuser/?keyword=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
