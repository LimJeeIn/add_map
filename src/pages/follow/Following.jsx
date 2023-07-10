import React, { useEffect, useState, useCallback } from 'react';
import TopFollowNav from '../../components/common/topNav/TopFollowNav';
import TabMenu from '../../components/common/tab/TabMenu';
import UserFollow from '../../components/common/user/UserFollow';
import { loadFollowingListAPI } from '../../api/profile/getFollowingAPI';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../atoms/Atoms';
import * as S from './Following.style';
import { useLocation } from 'react-router-dom';

function Following() {
  const [following, setFollowing] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const userToken = useRecoilValue(userTokenState);
  const pageSize = 8;
  const [pageNumber, setPageNumber] = useState(0);
  const location = useLocation();
  const accountname = location.pathname.split('/')[2];
  const skip = pageNumber * pageSize;

  const loadFollowing = useCallback(async () => {
    if (!hasMore) return;

    const data = await loadFollowingListAPI(
      accountname,
      userToken,
      skip,
      pageSize,
    );

    if (data) {
      setFollowing((prevState) => [...prevState, ...data]);
      if (data.length < pageSize) {
        setHasMore(false);
      }
    } else {
      console.error('API returned null or undefined');
    }
  }, [accountname, userToken, skip, pageSize, hasMore]);

  useEffect(() => {
    loadFollowing(pageNumber);
  }, [loadFollowing, pageNumber]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight ||
        !hasMore
      ) {
        return;
      }
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  return (
    <div>
      <TopFollowNav title="Following" />
      <S.FollowingWrapper>
        <S.FollowingUserList>
          {following &&
            following.map((item, index) => (
              <UserFollow key={`${item.accountname}-${index}`} data={item} />
            ))}
        </S.FollowingUserList>
      </S.FollowingWrapper>
      <TabMenu />
    </div>
  );
}

export default Following;
