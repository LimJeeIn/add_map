import styled from 'styled-components';

export const UserBox = styled.div`
  display: flex;
  width: 358px;
  height: 50px;
  padding: 12px;
  margin-bottom: 10px;
`;
export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
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

  .highlight {
    color: var(--main-color);
  }
`;
export const UserAddress = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: var(--sub-text-color);

  .highlight {
    color: var(--main-color);
  }
`;
