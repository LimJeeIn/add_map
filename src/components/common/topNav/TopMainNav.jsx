import React from 'react';
import * as S from './TopMainNav.style.js';
import searchIcon from '../../../assets/icon/icon-search.svg';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../../assets/images/logo-text.svg';
export default function TopMainNav() {
  const navigate = useNavigate();
  return (
    <S.Div>
      <S.Nav>
        <S.LogoText src={LogoImage} />
        <S.Button onClick={() => navigate('/search')}>
          <img src={searchIcon} alt="검색 아이콘" />
        </S.Button>
      </S.Nav>
    </S.Div>
  );
}
