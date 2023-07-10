import styled from 'styled-components';
import InputImage from '../../assets/images/img-button.svg';
export const TopBannerDiv = styled.div`
  height: 47px;
  background-color: white;
`;

export const ChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 10px;
  min-height: calc(100vh - 109px);
  padding: 20px;

  background-color: #f2f2f2;
`;

export const YourMessagDiv = styled.div`
  display: flex;
`;

export const YourProfileImage = styled.img.attrs({
  src: 'https://image.cine21.com/resize/cine21/still/2019/0329/16_33_46__5c9dca5a2d69b[X252,310].jpg',
  alt: '유저 프로필 이미지',
})`
  width: 42px;
  height: 42px;
  margin-right: 12px;
  border-radius: 50%;
  border: 0.5px solid var(--sub2-text-color);
  object-fit: cover;
`;

export const YourMessageText = styled.p`
  max-width: 240px;
  padding: 12px;
  margin-right: 6px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  border-top-left-radius: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--main-text-color);
  background-color: #ffffff;
`;

export const MyMessageDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const MyMessageText = styled.p`
  max-width: 240px;
  padding: 12px;
  margin-left: 6px;
  border-radius: 10px;
  border-top-right-radius: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  background-color: var(--main-color);
`;

export const CreatedTime = styled.p`
  align-self: flex-end;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  color: var(--sub-text-color);
`;

export const ChatForm = styled.form`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 12px 16px;
  border-top: 0.5px solid var(--sub2-text-color);
  background-color: #ffffff;
`;

export const FileInpLab = styled.label`
  width: 36px;
  height: 36px;
  background: url('${InputImage}') center/cover;
  cursor: pointer;
`;

export const TxtInp = styled.input`
  border: none;
  outline: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--main-text-color);
  &::placeholder {
    color: #c4c4c4;
  }
`;

export const SubmitButton = styled.button`
  margin-left: auto;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => (props.isButtonActive ? 'var(--main-color)' : '#c4c4c4')};
`;
