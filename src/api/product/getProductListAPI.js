import axios from 'axios';
import { apiURL } from '../apiURL';

export const getProductListAPI = async (accountname, token) => {
  try {
    const response = await axios.get(`${apiURL}product/${accountname}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('상품 목록 불러오기에 실패했습니다.', error);
    return null;
  }
};
