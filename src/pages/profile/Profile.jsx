import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { accountNameState, userTokenState } from '../../atoms/Atoms';
import { getMyInfoAPI } from '../../api/user/getMyInfoAPI';
import { getProductListAPI } from '../../api/product/getProductListAPI';
import { getProfilePostAPI } from '../../api/post/getProfilePostAPI';
import { followAPI } from '../../api/profile/followAPI';
import { unfollowAPI } from '../../api/profile/unFollowAPI';
import { getProfileAPI } from '../../api/profile/getProfileAPI';

import { useNavigate } from 'react-router-dom';

// 공통 컴포넌트
import TopBasicNav from '../../components/common/topNav/TopBasicNav';
import {
  MediumFollowButton,
  UnfollowButton,
} from '../../components/common/button/Button';
import HomePost from '../../components/common/home/HomePost';
import HomeAlbum from '../../components/common/home/HomeAlbum';
import TabMenu from '../../components/common/tab/TabMenu';
import ProductModal from '../../components/modal/ProductModal/ProductModal';

// 스타일
import * as S from './Profile.style';

// 이미지
import basicProfileImage from '../../assets/images/basic-profile-img.svg';
import postListOn from '../../assets/icon/icon-post-list-on.svg';
import postListOff from '../../assets/icon/icon-post-list-off.svg';
import postAlbumOn from '../../assets/icon/icon-post-album-on.svg';
import postAlbumOff from '../../assets/icon/icon-post-album-off.svg';

export default function Profile() {
  const [isListMode, setIsListMode] = useState(true);
  const [profile, setProfile] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(
    profile?.followerCount || 0,
  );
  const [followingCount, setFollowingCount] = useState(
    profile?.followingCount || 0,
  );
  const token = useRecoilValue(userTokenState);
  const myAccountname = useRecoilValue(accountNameState);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [myPost, setMyPost] = useState([]);
  const { accountname } = useParams();
  const myPostArray = myPost.post;
  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState('');
  const [productLink, setProductLink] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setisModalOpen] = useState(false);
  const showModal = () => {
    setisModalOpen(true);
  };

  useEffect(() => {
    setIsMyProfile(accountname === myAccountname);
  }, [accountname, myAccountname]);

  useEffect(() => {
    setIsFollowed(profile?.isfollow);
  }, [profile?.isfollow]);

  useEffect(() => {
    getProductListAPI(accountname, token).then((data) => {
      setProductList(data.product);
    });
    getProfilePostAPI(accountname, token).then((data) => {
      setMyPost(data);
    });
  }, [accountname, productList]);

  useEffect(() => {
    if (!isMyProfile) {
      getProfileAPI(accountname, token)
        .then((data) => {
          setProfile(data.profile);
          setFollowersCount(data.profile.followerCount);
          setFollowingCount(data.profile.followingCount);
        })
        .catch((error) => {
          console.error('프로필 데이터를 불러오지 못했습니다.', error);
        });
    } else {
      getMyInfoAPI(token)
        .then((data) => {
          setProfile(data.user);
          setFollowersCount(data.user.followerCount);
          setFollowingCount(data.user.followingCount);
        })
        .catch((error) => {
          console.error('프로필 데이터를 불러오지 못했습니다.', error);
        });
    }
  }, [isMyProfile, accountname, token]);

  const handleFollow = () => {
    if (isFollowed) {
      // 이미 팔로우한 경우
      unfollowAPI(accountname, token).then((data) => {
        console.log(data);
      });
      setIsFollowed(false);
      // console.log(isFollowed);
      setFollowersCount(followersCount - 1);
    } else {
      // 아직 팔로우하지 않은 경우
      followAPI(accountname, token).then((data) => {
        console.log(data);
      });
      setIsFollowed(true);
      console.log(isFollowed);
      setFollowersCount(followersCount + 1);
    }
  };
  const handleEditProfile = () => {
    navigate(`/profile/${myAccountname}/edit`);
  };

  const handleUploadProduct = () => {
    navigate('/product');
  };

  const handleProductClick = (e, product_Id, product_Link) => {
    if (isMyProfile) {
      e.preventDefault();
      showModal();
      setProductId(product_Id);
      setProductLink(product_Link);
    } else {
      e.stopPropagation();
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div>
      <TopBasicNav />
      <S.ProfileWrapper>
        <S.ProfileContainer>
          <S.ProfileHeader>
            {/* 프로필 팔로워수 처리 변경 */}
            <S.Followers
              onClick={() => {
                navigate(`/profile/${accountname}/follower`);
              }}
            >
              <span>{followersCount || 0}</span>
              <span>followers</span>
            </S.Followers>
            {/* 프로필 이미지 처리 변경 */}
            <S.ProfileImage
              src={profile ? profile.image : basicProfileImage}
              alt="프로필 사진"
            />
            {/* 프로필 팔로잉수 처리 변경 */}
            <S.Followings
              onClick={() => {
                navigate(`/profile/${accountname}/following`);
              }}
            >
              <span>{followingCount || 0}</span>
              <span>followings</span>
            </S.Followings>
          </S.ProfileHeader>
          <S.ProfileMain>
            {/* 프로필 정보 표시 변경 (사용자 이름, 계정명, 설명 등) */}
            <p>{profile ? profile.username : 'Loading...'}</p>
            <p>@{profile ? profile.accountname : 'Loading...'}</p>
            <p>{profile ? profile.intro : 'Loading...'}</p>
          </S.ProfileMain>
          <S.ProfileFooter>
            {isMyProfile ? (
              <>
                <S.EditProfileButton onClick={handleEditProfile}>
                  프로필 수정
                </S.EditProfileButton>
                <S.UploadProductButton onClick={handleUploadProduct}>
                  상품 등록
                </S.UploadProductButton>
              </>
            ) : (
              <>
                <button className="dm-btn"></button>
                {isFollowed ? (
                  <UnfollowButton
                    onClick={() => {
                      handleFollow();
                    }}
                  />
                ) : (
                  <MediumFollowButton
                    onClick={() => {
                      handleFollow();
                    }}
                  />
                )}
                <button className="share-btn"></button>
              </>
            )}
          </S.ProfileFooter>
        </S.ProfileContainer>
        {productList.length > 0 && (
          <S.ProductContainer>
            <h2>판매 중인 상품</h2>
            <S.ProductListUl>
              {productList.map((product, index) => (
                <S.ProductListLi key={index}>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      handleProductClick(e, product.id, product.link);
                    }}
                  >
                    <S.ProductItem src={product.itemImage} key={index} />
                    <S.ProductTitle>{product.itemName}</S.ProductTitle>
                    <S.ProductPrice>
                      {numberWithCommas(product.price)}원
                    </S.ProductPrice>
                  </a>
                </S.ProductListLi>
              ))}
            </S.ProductListUl>
          </S.ProductContainer>
        )}
        <S.PostContainer>
          <S.ViewOptions>
            <S.PostListButton
              src={isListMode ? postListOn : postListOff}
              alt="피드 목록형으로 보기"
              onClick={() => setIsListMode(true)}
            ></S.PostListButton>
            <S.PostAlbumButton
              src={isListMode ? postAlbumOff : postAlbumOn}
              alt="피드 앨범형으로 보기"
              onClick={() => setIsListMode(false)}
            ></S.PostAlbumButton>
          </S.ViewOptions>
          {isListMode &&
            myPostArray &&
            myPostArray.map((post, index) => (
              <HomePost post={post} key={index} postId={post.id} />
            ))}
          {!isListMode && <HomeAlbum profileArray={myPostArray} />}
        </S.PostContainer>
      </S.ProfileWrapper>
      <TabMenu />
      {isModalOpen ? (
        <ProductModal
          setisModalOpen={setisModalOpen}
          isMyProfile={isMyProfile}
          productList={productList}
          productId={productId}
          productLink={productLink}
        />
      ) : null}
    </div>
  );
}
