import styled from 'styled-components';
import MessageCircleIcon from '../../assets/icon/icon-message-circle-1.svg';
import ShareIcon from '../../assets/icon/icon-share.svg';

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: #f2f2f2;
  margin-top: 50px;
`;

//====프로필====
export const ProfileContainer = styled.div`
  height: auto;
  width: 100%;
  background-color: #fff;
`;

// 프로필 header
export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 41px;
  padding-top: 30px;
  margin-bottom: 14px;
  margin-left: 12px;
`;

export const Followers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
`;

export const Followings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 프로필 main
export const ProfileMain = styled.div`
  text-align: center;

  & p:first-child {
    font-weight: 700;
    line-height: 22px;
  }

  & p:nth-child(2) {
    font-size: 12px;
    line-height: 14px;
    margin-top: 6px;
    color: var(--sub-text-color);
  }

  & p:nth-child(3) {
    font-size: 14px;
    line-height: 18px;
    margin-top: 16px;
    color: var(--sub-text-color);
  }
`;

// 프로필 footer
export const ProfileFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
  padding-bottom: 26px;

  // DM 메시지 버튼
  .dm-btn {
    border: 1px solid #dbdbdb;
    border-radius: 30px;
    background: url(${MessageCircleIcon}) no-repeat;
    background-position: center center;
    width: 34px;
    height: 34px;
  }

  // 공유하기 버튼
  .share-btn {
    border: 1px solid #dbdbdb;
    border-radius: 30px;
    background: url(${ShareIcon}) no-repeat;
    background-position: center center;
    width: 34px;
    height: 34px;
  }
`;

export const EditProfileButton = styled.button`
  width: 120px;
  height: 34px;
  border: 1px solid #dbdbdb;
  border-radius: 38px;
  color: var(--sub-text-color);
`;

export const UploadProductButton = styled.button`
  width: 120px;
  height: 34px;
  border: 1px solid #dbdbdb;
  border-radius: 38px;
  color: var(--sub-text-color);
`;

// ====상품 product====
export const ProductContainer = styled.div`
  width: 100%;
  margin-top: 6px;
  margin: auto;
  background-color: #fff;
  padding: 18px 0 20px 20px;
  h2 {
    margin-bottom: 20px;
  }
`;
export const ProductListUl = styled.ul`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  width: 100%;
  // flex-wrap: nowrap;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--main-color);
    border-radius: 6px;
  }
`;
export const ProductListLi = styled.li`
  display: flex;
  position: relative;
  flex-direction: column;
  width: calc(140px + 8px);
`;
export const ProductItem = styled.img`
  width: 140px;
  height: 90px;
  border-radius: 8px;
`;
export const ProductTitle = styled.h3`
  font-size: 14px;
  line-height: 18px;
  padding: 6px 2px 4px;
  color: var(--main-text-color);
`;
export const ProductPrice = styled.span`
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  color: var(--main-color);
  padding: 0 2px 0;
`;

// ====post container====
export const PostContainer = styled.div`
  background-color: #fff;
  height: auto;
  margin-bottom: 50px;
`;

// 피드 정렬
export const ViewOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 22.5px;
  border-bottom: 1px solid #dbdbdb;
  margin: auto;
  padding-right: 12.25px;
  height: 44px;
  background-color: #fff;
`;

// 피드 목록형 버튼
export const PostListButton = styled.img`
  cursor: pointer;
  width: 26px;
  height: 26px;
`;

// 피드 앨범형 버튼
export const PostAlbumButton = styled.img`
  cursor: pointer;
  width: 26px;
  height: 26px;
`;
