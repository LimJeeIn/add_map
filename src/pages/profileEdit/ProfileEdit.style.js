import styled from 'styled-components';
import { DisabledSaveButton } from '../../components/common/button/Button.style';
import { SaveButton } from '../../components/common/button/Button.style';
import ProfileInputImage from '../../assets/images/upload-file.svg';
// 저장 버튼
export const CustomDisabledSaveButton = styled(DisabledSaveButton)`
  width: 90px;
  height: 32px;
  font-weight: 500;
  line-height: 19px;
  cursor: default;
`;

// 입력 값이 다 채워진 후 활성화된 버튼
export const CustomSaveButton = styled(SaveButton)`
  width: 90px;
  height: 32px;
  font-weight: 500;
  line-height: 19px;
`;

// 프로필 이미지
export const ImageContainer = styled.div`
  position: relative;
  width: 110px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const UploadDiv = styled.div`
  position: relative;
  width: fit-content;
  margin: 30px auto;
`;

export const UploadInputLabel = styled.label`
  position: absolute;
  background: url('${ProfileInputImage}') center/cover;

  width: 36px;
  height: 36px;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
`;

export const UploadInput = styled.input`
  display: none;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 36px;
  height: 36px;
`;

export const EditProfileImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

// 이름, 계정, 소개말
export const inputWrapper = styled.div`
  width: 320px;
  margin: 80px auto;
`;
