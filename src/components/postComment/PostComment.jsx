import React, { useState, useEffect } from 'react';
import * as S from './PostComment.style';
import moreIcon from '../../assets/icon/icon- more-vertical.svg';
import CommentModal from '../modal/CommentModal/CommentModal';
import { useRecoilValue } from 'recoil';
import { accountNameState } from '../../atoms/Atoms';
import { useNavigate } from 'react-router-dom';

export default function PostComment({ comment, postId, handleCommentDelete }) {
  const navigate = useNavigate();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isMyComment, setIsMyComment] = useState(false);
  const showModal = () => {
    setisModalOpen(true);
  };
  const accountname = useRecoilValue(accountNameState);
  useEffect(() => {
    if (comment.author.accountname === accountname) {
      setIsMyComment(true);
    }
  }, [comment.author.accountname, accountname]);
  //const commentId = comment.id 코멘트고유의id

  //댓글 작성된 시간 계산하기

  const createdAt = comment.createdAt; //협정세계시
  const createdDate = new Date(createdAt); //한국표준시로바꿈
  const now = new Date(); // 지금 한국시간 ex. Wed Jun 21 2023 10:21:04 GMT+0900
  const diffMs = now - createdDate;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const [commentDate, setCommentDate] = useState('');
  useEffect(() => {
    if (minutes === 0) {
      setCommentDate('방금');
    } else if (hours < 1) {
      setCommentDate(`${minutes}분`);
    } else if (days < 1) {
      setCommentDate(`${hours}시간`);
    } else {
      const year = createdDate.getFullYear();
      const month = ('0' + (createdDate.getMonth() + 1)).slice(-2);
      const day = ('0' + createdDate.getDate()).slice(-2);
      const formattedCreatedDate = `${year}년 ${month}월 ${day}일`;
      setCommentDate(formattedCreatedDate);
    }
  }, []);
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <div>
            <S.UserImage
              src={comment.author.image}
              onClick={() => navigate(`/profile/${comment.author.accountname}`)}
            />
            <S.Title>{comment.author.username}</S.Title>
            <S.WrittenTime>{commentDate}</S.WrittenTime>
          </div>
          <S.MoreButton onClick={showModal}>
            <img src={moreIcon} />
          </S.MoreButton>
        </S.Container>
        <S.CommentContent>{comment.content}</S.CommentContent>
      </S.Wrapper>
      {isModalOpen ? (
        <CommentModal
          setisModalOpen={setisModalOpen}
          isMyComment={isMyComment}
          commentId={comment.id}
          postId={postId}
          handleCommentDelete={handleCommentDelete}
        />
      ) : null}
    </>
  );
}
