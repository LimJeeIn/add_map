import React from 'react';
import TabMenu from '../../components/common/tab/TabMenu';
import TopBasicNav from '../../components/common/topNav/TopBasicNav';
import * as S from './ChatList.style';
import { useNavigate } from 'react-router-dom';

function ChatList() {
  const navigate = useNavigate();
  return (
    <>
      <TopBasicNav />
      <S.List>
        <S.ChatListWrapper onClick={() => navigate('/chat/:id')}>
          <S.UserImage src="https://image.cine21.com/resize/cine21/still/2019/0329/16_33_46__5c9dca5a2d69b[X252,310].jpg" />
          <S.NewChatCircle />
          <S.UserInfo>
            <S.UserName>지민맘</S.UserName>
            <S.ChatInfo>
              <S.UserChat>유모차가 정말 예쁘네요!</S.UserChat>
              <S.ChatDate>2023.06.27</S.ChatDate>
            </S.ChatInfo>
          </S.UserInfo>
        </S.ChatListWrapper>
        <S.ChatListWrapper>
          <S.UserImage src="https://image.aladin.co.kr/product/6395/19/cover500/f27243384d_1.jpg" />
          <S.NewChatCircle />
          <S.UserInfo>
            <S.UserName>혜미맘</S.UserName>
            <S.ChatInfo>
              <S.UserChat>안녕하세요!</S.UserChat>
              <S.ChatDate>2023.06.25</S.ChatDate>
            </S.ChatInfo>
          </S.UserInfo>
        </S.ChatListWrapper>
        <S.ChatListWrapper>
          <S.UserImage src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5389%2F2020%2F03%2F12%2F0000023698_002_20200312184625349.jpg&type=sc960_832" />
          <S.UserInfo>
            <S.UserName>석훈맘</S.UserName>
            <S.ChatInfo>
              <S.UserChat>안녕하세요 상품 구매 희망합니다 ^~^</S.UserChat>
              <S.ChatDate>2023.06.23</S.ChatDate>
            </S.ChatInfo>
          </S.UserInfo>
        </S.ChatListWrapper>
      </S.List>
      <TabMenu />
    </>
  );
}

export default ChatList;
