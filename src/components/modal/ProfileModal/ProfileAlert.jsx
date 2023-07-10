import React from 'react';
import {
  AlertContainer,
  DeleteConfirm,
  ButtonDiv,
  CancelButton,
  DeleteButton,
} from '../styled';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  isLoginState,
  userTokenState,
  accountNameState,
} from '../../../atoms/Atoms';

export default function ProfileAlert({ setIsAlertOpen }) {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLoginState);
  const setUserToken = useSetRecoilState(userTokenState);
  const setAccountName = useSetRecoilState(accountNameState);
  const handleLogout = () => {
    setIsLogin(false);
    setUserToken('');
    setAccountName('');
    navigate('/socialLogin');
  };

  return (
    <AlertContainer>
      <DeleteConfirm>로그아웃 하시겠어요?</DeleteConfirm>
      <ButtonDiv>
        <CancelButton
          onClick={() => {
            setIsAlertOpen(false);
          }}
        >
          취소
        </CancelButton>
        <DeleteButton onClick={handleLogout}>로그아웃</DeleteButton>
      </ButtonDiv>
    </AlertContainer>
  );
}
