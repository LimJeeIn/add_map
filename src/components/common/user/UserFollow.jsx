import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { followAPI } from '../../../api/profile/followAPI';
import { unfollowAPI } from '../../../api/profile/unFollowAPI';
import { accountNameState, userTokenState } from '../../../atoms/Atoms';
import Profile from '../../../assets/images/basic-profile.svg';
import * as S from './UserFollow.style';
import styled from 'styled-components';

const FollowButtonStyle = styled.button`
  border-radius: 26px;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  width: 56px;
  height: 28px;
  cursor: pointer;
  margin-left: auto;
`;

const SmallFollowButtonStyled = styled(FollowButtonStyle)`
  background: ${({ isActive }) => (isActive ? '#55bdb3' : '#FFFFFF')};
  color: ${({ isActive }) => (isActive ? '#FFFFFF' : '#767676')};
`;

const CancelButtonStyled = styled(FollowButtonStyle)`
  background: ${({ isActive }) => (!isActive ? '#FFFFFF' : '#55bdb3')};
  color: ${({ isActive }) => (!isActive ? '#767676' : '#FF6B6B')};
  border: 1px solid #dbdbdb;
`;

function UserFollow({ data }) {
  const [isFollow, setIsFollow] = useState(data.isfollow);
  const loginedAccount = useRecoilValue(accountNameState);
  const userToken = useRecoilValue(userTokenState);
  const navigate = useNavigate();

  const clickFollow = async () => {
    try {
      if (isFollow) {
        await unfollowAPI(data.accountname, userToken);
        setIsFollow(false);
      } else {
        await followAPI(data.accountname, userToken);
        setIsFollow(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const goToProfile = () => {
    navigate(`/profile/${data.accountname}`);
  };

  return (
    <S.UserBox>
      <S.ProfileImage
        onClick={goToProfile}
        src={data.image || Profile}
        alt="프로필 이미지"
      />
      <S.RightBox>
        <S.UserTitle>
          <S.Span>{data.username}</S.Span>
          {data.userTitle}
        </S.UserTitle>
        <S.UserAddress>@{data.accountname}</S.UserAddress>
      </S.RightBox>
      {loginedAccount !== data.accountname &&
        isFollow !== null &&
        (isFollow ? (
          <CancelButtonStyled isActive={false} onClick={clickFollow}>
            취소
          </CancelButtonStyled>
        ) : (
          <SmallFollowButtonStyled isActive onClick={clickFollow}>
            팔로우
          </SmallFollowButtonStyled>
        ))}
    </S.UserBox>
  );
}

export default UserFollow;
