import axios from 'axios';
import { apiURL } from '../apiURL';
//8.5 상품 삭제
export const deleteProductAPI = async (productId, token) => {
  try {
    const response = await axios.delete(`${apiURL}product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('상품 삭제하는 API 요청 에러', error);
  }
};
