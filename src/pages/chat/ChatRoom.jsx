import React, { useRef, useState } from 'react';

import * as S from './ChatRoom.style';
import TopChatNav from '../../components/common/topNav/TopChatNav';
import PostModal from '../../components/modal/PostModal/PostModal';

const ChatRoom = () => {
  // 모달창 상태값 + 모달타입 상태값
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const handleChangeInput = (e) => {
    const text = e.target.value;
    if (text || fileInputRef.current.value) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  };

  return (
    <>
      <S.TopBannerDiv>
        <TopChatNav />
      </S.TopBannerDiv>
      <S.ChatDiv>
        {/* 상대 메세지 - 텍스트 */}
        <S.YourMessagDiv>
          <S.YourProfileImage />
          <S.YourMessageText>안녕하세요!</S.YourMessageText>
          <S.CreatedTime>19:40</S.CreatedTime>
        </S.YourMessagDiv>
        {/* 내 메세지 - 텍스트 */}
        <S.MyMessageDiv>
          <S.MyMessageText>안녕하세요~~</S.MyMessageText>
          <S.CreatedTime>19:50</S.CreatedTime>
        </S.MyMessageDiv>
        <S.YourMessagDiv>
          <S.YourProfileImage />
          <S.YourMessageText>유모차가 정말 예쁘네요!</S.YourMessageText>
          <S.CreatedTime>12:55</S.CreatedTime>
        </S.YourMessagDiv>
      </S.ChatDiv>
      {/* 하단 input box */}
      <S.ChatForm action="" className="min-width">
        <S.FileInpLab htmlFor="fileInp">
          <input
            type="file"
            name=""
            id="fileInp"
            accept="image/*"
            className="a11y-hidden"
            ref={fileInputRef}
            onChange={(e) => {
              setIsButtonActive(e.target.value);
            }}
          />
        </S.FileInpLab>
        <S.TxtInp
          type="text"
          placeholder="메시지 입력하기..."
          id="txtInp"
          onChange={handleChangeInput}
        />
        <S.SubmitButton type="button" isButtonActive={isButtonActive}>
          전송
        </S.SubmitButton>
      </S.ChatForm>

      {isModalOpen ? <PostModal setIsModalOpen={setIsModalOpen} /> : null}
    </>
  );
};

export default ChatRoom;
