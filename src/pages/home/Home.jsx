import React, { useEffect, useState, useCallback } from 'react';
import * as S from './Home.style';
import Image from '../../assets/images/symbol-logo-gray.svg';
import loadingGif from '../../assets/images/loading.gif';

import TopMainNav from '../../components/common/topNav/TopMainNav';
import TabMenu from '../../components/common/tab/TabMenu';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../atoms/Atoms';
import HomePost from '../../components/common/home/HomePost';
import getPostFeedAPI from '../../api/post/getPostFeedAPI';

function Home() {
  const navigate = useNavigate();
  const userToken = useRecoilValue(userTokenState);
  const [followerData, setFollowerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadMorePosts = useCallback(async () => {
    setIsLoading(true);
    const data = await getPostFeedAPI(userToken, skip, 4);
    if (data) {
      setFollowerData((prevState) => [...prevState, ...data]);
      if (data.length < 4) {
        setHasMore(false);
      } else {
        setSkip((prevState) => prevState + 4);
      }
    }
    setIsLoading(false);
  }, [skip, userToken]);

  useEffect(() => {
    loadMorePosts();
  }, []);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      if (!isLoading && hasMore) {
        loadMorePosts();
      }
    }
  }, [isLoading, hasMore, loadMorePosts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <TopMainNav />
      <S.HomeWrapper>
        {isLoading ? (
          <S.LoadingImage src={loadingGif} alt="로딩중일 때 이미지" />
        ) : followerData?.length > 0 ? (
          followerData.map((post) => (
            <HomePost key={post.id} post={post} postId={post.id} />
          ))
        ) : (
          <>
            <S.HomeDiv>
              <S.HomeImage src={Image} alt="홈 피드 내용이 없을 때의 이미지" />
              <S.HomeDescription>
                유저를 검색해 팔로우 해보세요
              </S.HomeDescription>
              <S.SearchButton onClick={() => navigate('/search')}>
                검색하기
              </S.SearchButton>
            </S.HomeDiv>
          </>
        )}
      </S.HomeWrapper>
      <TabMenu />
    </>
  );
}

export default Home;
