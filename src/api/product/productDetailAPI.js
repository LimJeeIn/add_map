import axios from 'axios';
import { apiURL } from '../apiURL';

//8.3 상품 상세
export const productDetailAPI = async (productId, userToken) => {
  try {
    const response = await axios.get(`${apiURL}product/detail/${productId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('상품 상세 가져오는 API 요청 에러', error);
  }
};
