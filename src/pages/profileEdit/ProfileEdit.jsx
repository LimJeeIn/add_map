import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accountNameState, userTokenState } from '../../atoms/Atoms';
import { editProfileAPI } from '../../api/profile/editProfileAPI';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import TopUploadNav from '../../components/common/topNav/TopUploadNav';
import * as S from './ProfileEdit.style';
import InputBox from '../../components/common/input/InputBox';
import { getMyInfoAPI } from '../../api/user/getMyInfoAPI';
import { uploadImageAPI } from '../../api/uploadImg/uploadImageAPI';
import { accountnameValidAPI } from '../../api/user/accountnameValidAPI';

export default function ProfileEdit() {
  const navigate = useNavigate();
  const userToken = useRecoilValue(userTokenState);
  const setAccountName = useSetRecoilState(accountNameState);
  //인풋 입력 상태 저장
  const [username, setUsername] = useState(''); //사용자 이름 값
  const [accountId, setAccountId] = useState(''); // 계정 ID 값
  const [introduction, setIntroduction] = useState(''); // 소개 값

  const [image, setImage] = useState('');
  const [isInputFilled, setIsInputFilled] = useState(false);

  // 유효성 검사 결과 저장
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isAccountIdValid, setIsAccountIdValid] = useState(true);

  // 유효성 검사 통과 실패 시 에러 메시지
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [accountIdErrorMessage, setAccountIdErrorMessage] = useState('');

  // 수정페이지 들어갔을떄 수정 전의 내용들을 보여주기
  useEffect(() => {
    const getMyInfoFunc = async () => {
      const myInfoDatas = await getMyInfoAPI(userToken);
      setImage(myInfoDatas?.user?.image);
      setUsername(myInfoDatas?.user?.username); //사용자 이름 값
      setAccountId(myInfoDatas?.user?.accountname); // 계정 ID 값
      setIntroduction(myInfoDatas?.user?.intro); // 소개 값
    };
    getMyInfoFunc();
  }, []);

  const handleEditProfile = async () => {
    if (isInputFilled) {
      const result = await editProfileAPI(
        username,
        accountId,
        introduction,
        image,
      );

      if (result) {
        console.log('프로필 수정이 완료되었습니다.', result);
        setAccountName(result.user.accountname);
        navigate(`/profile/${result.user.accountname}`);
      } else {
        console.log('프로필 수정에 실패했습니다.');
      }
    }
  };

  // 사용자 이름 유효성 검사 및 에러 메시지 설정
  const handleUserNameValid = (e) => {
    const currentUsername = e.target.value;
    setUsername(currentUsername);
    if (currentUsername === '') {
      setIsUsernameValid(false);
      setUsernameErrorMessage('');
    } else if (currentUsername.length >= 2 && currentUsername.length <= 10) {
      setIsUsernameValid(true);
      setUsernameErrorMessage('');
    } else {
      setIsUsernameValid(false);
      setUsernameErrorMessage('* 2~10자로 작성해주세요');
    }
  };

  // userId 중복 검사 (api)
  const handleUserIdDuplicateValid = async (e) => {
    const testAccountname = e.target.value;
    setAccountId(testAccountname);
    const validMessage = await accountnameValidAPI(testAccountname);
    if (validMessage?.message === '이미 가입된 계정ID 입니다.') {
      setIsAccountIdValid(false);
      setAccountIdErrorMessage('* 이미 사용 중인 ID입니다.');
    } else {
      setIsAccountIdValid(true);
      setAccountIdErrorMessage('');
    }
  };

  // 계정 ID 유효성 검사 및 에러 메시지 설정
  const handleAccountIdValid = (e) => {
    const inputAccountId = e.target.value;
    setAccountId(inputAccountId);

    if (inputAccountId) {
      const regex = /^[a-zA-Z0-9._]+$/;
      const isValid = regex.test(inputAccountId);
      if (!isValid) {
        setIsAccountIdValid(false);
        setAccountIdErrorMessage(
          '영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.',
        );
      } else {
        setIsAccountIdValid(true);
        setAccountIdErrorMessage('');
      }
    } else {
      setIsAccountIdValid(true);
      setAccountIdErrorMessage('');
    }
  };

  const handleIntro = (e) => {
    setIntroduction(e.target.value);
  };

  // 사용자 이름, 계정 ID input 값이 유효한지 확인
  useEffect(() => {
    if (isUsernameValid && isAccountIdValid && username && accountId) {
      setIsInputFilled(true);
    } else {
      setIsInputFilled(false);
    }
  }, [isUsernameValid, isAccountIdValid, username, accountId]);

  // 이미지 업로드
  const uploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      uploadImageAPI(image).then((img) => {
        setImage(img);
      });
    }
  };
  return (
    <div>
      <TopUploadNav handleUpload={handleEditProfile} />
      <S.UploadDiv>
        <S.ProfileImage src={image} alt="회원가입 유저 프로필 이미지" />
        <S.UploadInputLabel htmlFor="uploadInput" />
        <S.UploadInput
          type="file"
          id="uploadInput"
          alt="프로필 수정 업로드 이미지"
          accept="image/"
          onChange={uploadImage}
        />
      </S.UploadDiv>
      <S.inputWrapper>
        <InputBox
          label="사용자 이름"
          id="username"
          type="text"
          placeholder="2~10자 이내여야 합니다."
          value={username}
          min={2}
          max={10}
          borderBottomColor={isUsernameValid ? null : 'on'}
          errorMessage={usernameErrorMessage}
          show={isUsernameValid ? null : 'on'}
          onChange={handleUserNameValid}
        />
        <InputBox
          label="계정 ID"
          id="accountId"
          type="text"
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          value={accountId}
          borderBottomColor={isAccountIdValid ? null : 'on'}
          errorMessage={accountIdErrorMessage}
          show={!isAccountIdValid ? 'on' : null}
          onChange={handleAccountIdValid}
          onBlur={handleUserIdDuplicateValid}
        />
        <InputBox
          label="소개"
          id="introduction"
          type="text"
          placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
          value={introduction}
          borderBottomColor={null}
          errorMessage={null}
          show={null}
          onChange={handleIntro}
        />
      </S.inputWrapper>
    </div>
  );
}
