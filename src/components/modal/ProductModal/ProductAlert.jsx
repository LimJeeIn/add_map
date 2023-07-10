import React from 'react';
import {
  AlertContainer,
  DeleteConfirm,
  ButtonDiv,
  CancelButton,
  DeleteButton,
} from '../styled';
import { deleteProductAPI } from '../../../api/product/deleteProductAPI';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../atoms/Atoms';

export default function ProductAlert({
  setIsAlertOpen,
  productId,
  setisModalOpen,
}) {
  const token = useRecoilValue(userTokenState);
  const deleteProduct = () => {
    deleteProductAPI(productId, token).then((data) => {
      console.log(data, '삭제됨');
      setIsAlertOpen(false);
      setisModalOpen(false);
    });
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
        <DeleteButton onClick={() => deleteProduct()}>삭제</DeleteButton>
      </ButtonDiv>
    </AlertContainer>
  );
}
