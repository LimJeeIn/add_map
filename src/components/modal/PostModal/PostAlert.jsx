import React from 'react';
import {
  AlertContainer,
  DeleteConfirm,
  ButtonDiv,
  CancelButton,
  DeleteButton,
} from '../styled';
import { deletePostAPI } from '../../../api/post/deletePostAPI';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../atoms/Atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { accountNameState } from '../../../atoms/Atoms';
export default function PostAlert({ setIsAlertOpen, postId, setisModalOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useRecoilValue(userTokenState);
  const accountname = useRecoilValue(accountNameState);
  const deletePost = () => {
    if (location.pathname === `/profile/${accountname}`) {
      deletePostAPI(postId, token).then((data) => {
        console.log(data);
        setisModalOpen(false);
      });
    } else {
      deletePostAPI(postId, token).then((data) => {
        console.log(data);
      });
      navigate(`/profile/${accountname}`);
    }
    console.log(location.pathname);
  };

  return (
    <AlertContainer>
      <DeleteConfirm>삭제하시겠어요?</DeleteConfirm>
      <ButtonDiv>
        <CancelButton
          onClick={() => {
            setIsAlertOpen(false);
          }}
        >
          취소
        </CancelButton>
        <DeleteButton onClick={deletePost}>삭제</DeleteButton>
      </ButtonDiv>
    </AlertContainer>
  );
}
