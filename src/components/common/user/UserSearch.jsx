import React from 'react';
import defaultProfileImage from '../../../assets/images/basic-profile.svg';
import * as S from './UserSearch.style';
import { useNavigate } from 'react-router-dom';

function UserSearch({ accountname, username, profileImage, searchValue }) {
  const navigate = useNavigate();

  const highlightText = (text, keyword) => {
    if (!keyword) {
      return <>{text}</>;
    }

    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <S.Span key={i}>{part}</S.Span>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  const handleUserClick = () => {
    navigate(`/profile/${accountname}`);
  };

  return (
    <S.UserBox onClick={handleUserClick}>
      <S.ProfileImage
        src={profileImage ? profileImage : defaultProfileImage}
        alt="프로필 이미지"
      />
      <S.RightBox>
        <S.UserTitle>{highlightText(accountname, searchValue)}</S.UserTitle>
        <S.UserAddress>
          @{highlightText(username.replace(/\s+/g, '_'), searchValue)}
        </S.UserAddress>
      </S.RightBox>
    </S.UserBox>
  );
}

export default UserSearch;
