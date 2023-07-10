import React, { useEffect, useState, useCallback } from 'react';
import TopFollowNav from '../../components/common/topNav/TopFollowNav';
import TabMenu from '../../components/common/tab/TabMenu';
import UserFollow from '../../components/common/user/UserFollow';
import { loadFollowerListAPI } from '../../api/profile/getFollowerAPI';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../atoms/Atoms';
import * as S from './Follower.style';
import { useLocation } from 'react-router-dom';

function Follower() {
  const [followers, setFollowers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const userToken = useRecoilValue(userTokenState);
  const pageSize = 8;
  const [pageNumber, setPageNumber] = useState(0);
  const location = useLocation();
  const accountname = location.pathname.split('/')[2];
  const skip = pageNumber * pageSize;

  const loadFollowers = useCallback(async () => {
    if (!hasMore) return;

    const data = await loadFollowerListAPI(
      accountname,
      userToken,
      skip,
      pageSize,
    );

    if (data) {
      console.log(data);
      setFollowers((prevState) => [...prevState, ...data]);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      if (data.length < pageSize) {
        setHasMore(false);
      }
    } else {
      console.error('API returned null or undefined');
    }
  }, [accountname, userToken, skip, pageSize, hasMore]);

  useEffect(() => {
    if (pageNumber === 0) {
      loadFollowers();
    }
  }, [loadFollowers, pageNumber]);

  useEffect(() => {
    const handleScroll = () => {
      // 현재 스크롤 위치가 문서의 끝에 아직 도달하지 않았을 때
      if (
        window.innerHeight + document.documentElement.scrollTop <
          document.documentElement.offsetHeight ||
        !hasMore // 더 이상 가져올 데이터가 없을 때
      )
        return;

      loadFollowers();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadFollowers, hasMore]);

  return (
    <div>
      <TopFollowNav title="Followers" />
      <S.FollowerWrapper>
        <S.FollowerUserList>
          {followers &&
            followers.map((item, index) => (
              <UserFollow key={`${item.accountname}-${index}`} data={item} />
            ))}
        </S.FollowerUserList>
      </S.FollowerWrapper>
      <TabMenu />
    </div>
  );
}

export default Follower;
