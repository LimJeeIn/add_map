import React, { useState, useEffect } from 'react';
import { Container, Ul, Li, GrayLine, Button } from '../styled';
import CommentAlert from './CommentAlert';

export default function CommentModal({
  setisModalOpen,
  isMyComment,
  commentId,
  postId,
  handleCommentDelete,
}) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [content, setContent] = useState('신고');
  useEffect(() => {
    if (isMyComment) {
      setContent('삭제');
    } else {
      setContent('신고');
    }
  }, [isMyComment]);
  return (
    <>
      <Container onClick={() => setisModalOpen(false)}></Container>
      <Ul>
        <GrayLine></GrayLine>
        <Li>
          <Button onClick={() => setIsAlertOpen(true)}>{content}</Button>
        </Li>
      </Ul>
      {isAlertOpen ? (
        <CommentAlert
          setIsAlertOpen={setIsAlertOpen}
          content={content}
          commentId={commentId}
          postId={postId}
          handleCommentDelete={handleCommentDelete}
          setisModalOpen={setisModalOpen}
        />
      ) : null}
    </>
  );
}
