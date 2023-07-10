import styled from 'styled-components';

export const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
`;

export const P = styled.p`
  font-size: 10px;
  /* color: ${({ active }) =>
    active ? 'var(--main-color)' : 'var(--main-text-color)'}; */
  color: ${({ active }) => (active ? '#55BDB3' : 'black')};
`;

export const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px 6px;
  text-align: center;
`;

export const Nav = styled.nav`
  background-color: white;
  bottom: 0;
  position: fixed;
  width: 100%;
  border-top: 0.5px solid #dbdbdb;
  z-index: 100;
`;
