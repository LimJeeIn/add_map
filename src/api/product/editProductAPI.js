import axios from 'axios';
import { apiURL } from '../apiURL';
//8.4 상품 수정
export const editProductAPI = async (productId, sendData, userToken) => {
  try {
    const response = await axios.put(
      `${apiURL}product/${productId}`,
      sendData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('상품 수정하는 API 요청 에러', error);
  }
};
