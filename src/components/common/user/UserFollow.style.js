import styled from 'styled-components';

export const UserBox = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;
export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 12px;
  border-radius: 50%;
`;
export const RightBox = styled.div`
  padding: 6px 0;
`;
export const Span = styled.span`
  color: var(--main-color);
`;
export const UserTitle = styled.h2`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 6px;
`;
export const UserAddress = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: var(--sub-text-color);
`;
