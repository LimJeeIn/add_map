import React, { useState, useEffect } from 'react';
import locationIcon from '../../assets/icon/icon-map-location.svg';
import * as S from './PreschoolList.style';

export default function PreschoolList({
  id,
  name,
  address,
  telephone,
  handleMapLocation,
}) {
  return (
    <>
      <S.ListContent onClick={handleMapLocation} data-id={id}>
        <S.ContentWrapper>
          <S.ContentTitle className="name">{name}</S.ContentTitle>
          <S.ContentInfo className="address">{address}</S.ContentInfo>
          <S.ContentNumber className="en">
            <span className="bold">TEL</span>
            {telephone}
          </S.ContentNumber>
        </S.ContentWrapper>
        <S.Location src={locationIcon} />
      </S.ListContent>
    </>
  );
}
