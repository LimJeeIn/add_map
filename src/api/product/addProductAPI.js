import axios from 'axios';
import { apiURL } from '../apiURL';

export const addProductAPI = async (sendData, userToken) => {
  try {
    const response = await axios.post(`${apiURL}product`, sendData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in addProductAPI:', error.message);
  }
};
