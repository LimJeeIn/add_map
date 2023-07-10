import React, { useState, useEffect } from 'react';
import * as S from './HomePost.style';
import PostModal from '../../modal/PostModal/PostModal';
import { useRecoilValue } from 'recoil';
import { accountNameState, userTokenState } from '../../../atoms/Atoms';
import { useNavigate } from 'react-router-dom';
import { likeAPI } from '../../../api/likeHeart/likeAPI';
import { unLikeAPI } from '../../../api/likeHeart/unLikeAPI';
import basicHeartIcon from '../../../assets/icon/icon-heart.svg';
import ColorHeartIcon from '../../../assets/icon/icon-heart-fill.svg';

function HomePost({ post, postId, commentCount }) {
  const navigate = useNavigate();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);
  const showModal = () => {
    setisModalOpen(true);
  };
  const accountname = useRecoilValue(accountNameState);
  const token = useRecoilValue(userTokenState);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.heartCount);
  const handleLikeClick = () => {
    if (isLiked) {
      unLike();
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      like();
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  };
  useEffect(() => {
    setIsLiked(post.hearted);
  }, [post.hearted]);
  const like = () => {
    likeAPI(postId, token).then((data) => console.log(data));
    console.log('Like');
  };

  const unLike = () => {
    unLikeAPI(postId, token).then((data) => console.log(data));
    console.log('Unlike');
  };
  useEffect(() => {
    if (post.author.accountname === accountname) {
      setIsMyPost(true);
    }
  }, [post.author.accountname, accountname]);

  //작성된 날짜 계산하기
  const createdAt = post.createdAt;
  const date = new Date(createdAt); //한국시간으로바꿔줌
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const createdDate = year + '년 ' + month + '월 ' + day + '일';
  return (
    <>
      <S.Wrapper>
        <S.Article>
          <S.UserImage
            src={post.author.image}
            onClick={() => navigate(`/profile/${post.author.accountname}`)}
          />
          <S.PostWapper>
            <S.PostHeader>
              <S.Title>
                {post.author.username}
                <S.SubTitle>{post.author.accountname}</S.SubTitle>
              </S.Title>
              <S.MoreButton onClick={showModal}></S.MoreButton>
            </S.PostHeader>
            <S.PostDetail>
              <S.Content onClick={() => navigate(`/post/${postId}`)}>
                {post.content}
              </S.Content>
              {post.image ? (
                post.image.split(',').length === 1 ? (
                  <S.ContentImage
                    onClick={() => navigate(`/post/${postId}`)}
                    src={post.image.split(',')[0]}
                  />
                ) : (
                  <S.MultipleImgUl>
                    {post.image.split(',').map((image, index) => (
                      <S.ContentImageWrapper
                        onClick={() => navigate(`/post/${postId}`)}
                        key={index}
                      >
                        <S.ContentImage src={image} alt="포스트 이미지" />
                      </S.ContentImageWrapper>
                    ))}
                  </S.MultipleImgUl>
                )
              ) : null}
            </S.PostDetail>
            <S.PostIconWrapper>
              <S.Like>
                <S.LikeIcon
                  onClick={handleLikeClick}
                  src={isLiked ? ColorHeartIcon : basicHeartIcon}
                />
                <S.LikeCount>{likeCount}</S.LikeCount>
              </S.Like>
              <S.Comment>
                <S.CommentIcon
                  onClick={() => navigate(`/post/${postId}`)}
                ></S.CommentIcon>
                <S.CommentCount>
                  {commentCount || post.commentCount}
                </S.CommentCount>
              </S.Comment>
            </S.PostIconWrapper>
            <S.PostDate>{createdDate}</S.PostDate>
          </S.PostWapper>
        </S.Article>
      </S.Wrapper>
      {isModalOpen ? (
        <PostModal
          setisModalOpen={setisModalOpen}
          isMyPost={isMyPost}
          postId={postId}
        />
      ) : null}
    </>
  );
}
export default HomePost;
