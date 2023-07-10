import React, { useEffect, useState } from 'react';
import TopSearchNav from '../../components/common/topNav/TopSearchNav';
import TabMenu from '../../components/common/tab/TabMenu';
import UserSearch from '../../components/common/user/UserSearch';

import { useRecoilState, useRecoilValue } from 'recoil';
import { searchValueState, userTokenState } from '../../atoms/Atoms';
import { searchUserAPI } from '../../api/search/searchUserAPI';

export default function Search() {
  // 검색어 입력한 value값
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  // searchUserAPI
  const [searchUserData, setSearchUserData] = useState([]);
  const userToken = useRecoilValue(userTokenState);

  useEffect(() => {
    if (searchValue) {
      const getSearchUserAPIDatas = async () => {
        const searchUserAPIData = await searchUserAPI(userToken, searchValue);
        setSearchUserData(searchUserAPIData);
      };
      getSearchUserAPIDatas();
    } else {
      setSearchUserData([]);
    }
  }, [searchValue, userToken]);

  const searchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <TopSearchNav
        searchValue={searchValue}
        onSearchInputChange={searchInputChange}
      />
      {searchUserData.map((user) => (
        <UserSearch
          key={user.accountname}
          searchValue={searchValue}
          accountname={user.accountname}
          username={user.username}
          profileImage={user.image}
        />
      ))}
      <TabMenu />
    </>
  );
}
