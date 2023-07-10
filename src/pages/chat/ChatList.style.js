import styled from 'styled-components';

export const List = styled.ul`
  margin: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 320px;
  margin-top: 60px;
`;

export const ChatListWrapper = styled.li`
  display: flex;
  flex-wrap: nowrap;
  cursor: pointer;
`;

export const UserImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #dbdbdb;
  object-fit: cover;
`;
export const NewChatCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--main-color);
  position: absolute;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 5px 0 0 12px;
  flex-grow: 1;
  flex-shrink: 1;
`;
export const UserName = styled.strong`
  font-size: 14px;
  font-weight: 500;
  color: var(--main-text-color);
`;

export const ChatInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UserChat = styled.p`
  font-size: 12px;
  line-height: 15px;
  color: var(--sub-text-color);
  /* 한줄 말줄임 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatDate = styled.span`
  font-size: 12px;
  color: var(--sub-text-color);
`;
