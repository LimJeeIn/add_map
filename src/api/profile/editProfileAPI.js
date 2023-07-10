import axios from 'axios';
import { apiURL } from '../apiURL';

export const editProfileAPI = async (userName, userId, userIntro, userImg) => {
  try {
    const localStorageData = JSON.parse(localStorage.getItem('recoil-persist'));
    const userTokenState = localStorageData.userTokenState;
    const data = {
      user: {
        username: userName,
        accountname: userId,
        intro: userIntro,
        image: userImg,
      },
    };

    const res = await axios.put(`${apiURL}user`, data, {
      headers: {
        Authorization: `Bearer ${userTokenState}`,
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
