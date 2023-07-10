import React, { useState } from 'react';
import {
  AlertContainer,
  DeleteConfirm,
  ButtonDiv,
  CancelButton,
  DeleteButton,
} from '../styled';
import { deleteCommentAPI } from '../../../api/comment/deleteCommentAPI';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../atoms/Atoms';
import ReportCommentAlert from './ReportCommentAlert';
export default function CommentAlert({
  setIsAlertOpen,
  content,
  commentId,
  postId,
  handleCommentDelete,
  setisModalOpen,
}) {
  const token = useRecoilValue(userTokenState);
  const [isReported, setIsReported] = useState(false);
  const deleteComment = () => {
    console.log('삭제');
    deleteCommentAPI(postId, token, commentId).then((data) =>
      console.log(data),
    );
    handleCommentDelete();
  };
  const reportComment = () => {
    console.log('신고');
    setIsReported(true);
  };
  const handleButtonClick = () => {
    if (content === '삭제') {
      deleteComment();
    } else if (content === '신고') {
      reportComment();
    }
  };
  return (
    <>
      <AlertContainer>
        <DeleteConfirm>{content}하시겠어요?</DeleteConfirm>
        <ButtonDiv>
          <CancelButton
            onClick={() => {
              setIsAlertOpen(false);
            }}
          >
            취소
          </CancelButton>
          <DeleteButton onClick={handleButtonClick}>{content}</DeleteButton>
        </ButtonDiv>
      </AlertContainer>
      {isReported ? (
        <ReportCommentAlert setisModalOpen={setisModalOpen} />
      ) : null}
    </>
  );
}
