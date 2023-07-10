import React, { useState } from 'react';
import ProfileImage from '../../../assets/images/basic-profile.svg';
import * as S from './Comment.style';

import { postCommentAPI } from '../../../api/comment/postCommentAPI';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../atoms/Atoms';

function Comment({ myProfileImg, postId, handleCommentSubmit }) {
  const [comment, setComment] = useState('');
  const [disabled, setDisabled] = useState(true);

  const token = useRecoilValue(userTokenState);
  const commentContent = {
    comment: {
      content: comment,
    },
  };
  const handleChange = (event) => {
    setComment(event.target.value);
    if (event.target.value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleSubmit = () => {
    postCommentAPI(postId, commentContent, token).then((data) => {
      console.log(data);
    });
    handleCommentSubmit();
    setComment('');
  };
  return (
    <S.CommentBox>
      <S.CommentProfile
        src={myProfileImg ? myProfileImg : ProfileImage}
        alt={'(user이름)님의 프로필사진'}
      />
      <label htmlFor="commentInput" className="a11y-hidden">
        댓글 입력창
      </label>
      <S.CommentInput
        placeholder="댓글 입력하기..."
        id="commentInput"
        value={comment}
        onChange={handleChange}
      />
      <S.PostButton onClick={handleSubmit} disabled={disabled}>
        게시
      </S.PostButton>
    </S.CommentBox>
  );
}

export default Comment;
