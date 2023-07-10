import styled from 'styled-components';

export const Map = styled.section`
  display: flex;
  padding: 45px 0 60px;
  height: 100vh;

  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

export const ListContainer = styled.article`
  width: 40%;
  height: 100%;

  @media (max-width: 980px) {
    width: 100%;
    height: 100%;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 20px; */
  padding: 20px;
`;

export const Pagination = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 35px;
`;

export const PaginationNumber = styled.li`
  border-radius: 5px;
  padding: 5px 8px;
  cursor: pointer;
`;
