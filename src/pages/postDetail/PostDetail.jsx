import React from 'react';
import * as S from './PostDetail.style';
import TopBasicNav from '../../components/common/topNav/TopBasicNav';
import HomePost from '../../components/common/home/HomePost';
import CommentInput from '../../components/common/user/Comment';
import PostComment from '../../components/postComment/PostComment';

import { useState, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { userTokenState, accountNameState } from '../../atoms/Atoms';
import { getMyInfoAPI } from '../../api/user/getMyInfoAPI';
import { getPostDetailAPI } from '../../api/post/getPostDetailAPI';
import { getCommentAPI } from '../../api/comment/getCommentAPI';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { postId } = useParams();
  // const postId = '648eff03b2cb20566339b578'; //글을 업로드하면 id가 자체적으로생김. 디스코드참고

  const token = useRecoilValue(userTokenState);
  const accountname = useRecoilValue(accountNameState);
  const [myProfileImg, setMyProfileImg] = useState('');
  const [commentData, setCommentData] = useState([]);
  const [postData, setPostData] = useState({});
  const post = postData.post;

  const handleCommentSubmit = () => {
    // 댓글 작성 후 실행되는 로직, 댓글 추가되면 바로 댓글수가 업데이트됨.
    // 예: 댓글 작성 API 호출 완료 후에 아래 코드를 실행하여 post.commentCount 값을 업데이트합니다.
    setPostData((prevData) => ({
      ...prevData,
      post: {
        ...prevData.post,
        commentCount: prevData.post.commentCount + 1,
      },
    }));
  };
  const handleCommentDelete = () => {
    // 댓글 삭제 후 실행되는 로직. 댓글 삭제되면 바로 댓글수 업데이트됨.
    // 예: 댓글 삭제 API 호출 완료 후에 아래 코드를 실행하여 post.commentCount 값을 업데이트합니다.
    setPostData((prevData) => ({
      ...prevData,
      post: {
        ...prevData.post,
        commentCount: prevData.post.commentCount - 1,
      },
    }));
  };
  useEffect(() => {
    //console.log(token);
    getMyInfoAPI(token).then((data) => {
      setMyProfileImg(data.user.image); //프로필 사진 가져오기
    });

    getPostDetailAPI(postId, token).then((data) => {
      setPostData(data); //postData는 지금 {post: 어쩌구..}, post =postData.post
    });
  }, []);

  useEffect(() => {
    getCommentAPI(postId, token).then((data) => {
      setCommentData(Array.from(data.comments)); //유사배열객체 data.comments를 배열로바꾼다.
    });
  }, [commentData]);
  return (
    <S.Container>
      <TopBasicNav />
      {post && <HomePost post={post} postId={postId} />}
      <S.Line />
      <S.PostCommentWrapper>
        {commentData &&
          commentData
            .reverse()
            .map((comment) => (
              <PostComment
                comment={comment}
                key={comment.id}
                postId={postId}
                handleCommentDelete={handleCommentDelete}
              />
            ))}
      </S.PostCommentWrapper>
      <CommentInput
        myProfileImg={myProfileImg}
        postId={postId}
        handleCommentSubmit={handleCommentSubmit}
      />
    </S.Container>
  );
}
//<PostComment />
