import styled from 'styled-components';

export const Nav = styled.nav`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #dbdbdb;
`;

export const Input = styled.input`
  background: #f2f2f2;
  margin-left: 20px;
  border-radius: 32px;
  border: none;
  width: 100%;

  height: 32px;
  padding: 7px 16px;
  font-size: 14px;
  outline: none;
  &::placeholder {
    color: #c4c4c4;
  }
`;
export const Button = styled.button`
  width: 22px;
  height: 22px;
`;
