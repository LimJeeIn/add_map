import React from 'react';
import * as S from './TopFollowNav.style';
import arrowLeft from '../../../assets/icon/icon-arrow-left.svg';
import { useNavigate } from 'react-router-dom';

export default function TopFollowNav({ title }) {
  const navigate = useNavigate();

  return (
    <S.Div>
      <S.Nav>
        <S.arrowButton onClick={() => navigate(-1)}>
          <img src={arrowLeft} alt="뒤로가기" />
        </S.arrowButton>
        <S.Title>{title}</S.Title>
      </S.Nav>
    </S.Div>
  );
}
