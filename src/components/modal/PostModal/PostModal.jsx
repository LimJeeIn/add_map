import React, { useState } from 'react';
import { Container, Ul, Li, GrayLine, Button } from '../styled';
import PostAlert from './PostAlert';
import ReportAlert from '../ReportModal/ReportAlert';
import { useNavigate } from 'react-router-dom';

export default function PostModal({ setisModalOpen, isMyPost, postId }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isReportAlertOpen, setIsReportAlertOpen] = useState(false);
  const navigate = useNavigate();
  const handleToEdit = () => {
    navigate(`/post/edit/${postId}`);
  };

  return (
    <>
      <Container onClick={() => setisModalOpen(false)}></Container>
      <Ul>
        <GrayLine></GrayLine>
        {isMyPost ? (
          <>
            <Li>
              <Button onClick={() => setIsAlertOpen(true)}>삭제</Button>
            </Li>
            <Li>
              <Button onClick={handleToEdit}>수정</Button>
            </Li>
          </>
        ) : (
          <Li>
            <Button onClick={() => setIsReportAlertOpen(true)}>신고</Button>
          </Li>
        )}
      </Ul>
      {isAlertOpen ? (
        <PostAlert
          setisModalOpen={setisModalOpen}
          setIsAlertOpen={setIsAlertOpen}
          postId={postId}
        />
      ) : null}
      {isReportAlertOpen ? (
        <ReportAlert
          setIsReportAlertOpen={setIsReportAlertOpen}
          postId={postId}
          setisModalOpen={setisModalOpen}
        />
      ) : null}
    </>
  );
}
