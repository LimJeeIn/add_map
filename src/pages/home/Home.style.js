import styled from 'styled-components';

export const HomeWrapper = styled.div`
  min-height: calc(100vh - 108px); // 헤더 + 네브 === 108
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  margin-top: 50px;
`;

export const LoadingImage = styled.img`
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
`;

export const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -25px;
`;

export const HomeImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 25px;
`;

export const HomeDescription = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: var(--sub-text-color);
  margin-bottom: 20px;
`;

export const SearchButton = styled.button`
  width: 120px;
  height: 44px;
  background-color: var(--main-color);
  border-radius: 44px;
  color: white;
`;
