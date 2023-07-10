import { useState, useRef, useEffect } from 'react';
import React from 'react';
import BasicProfileImg from '../../assets/images/Ellipse-1.png';
import TopUploadNav from '../../components/common/topNav/TopUploadNav.jsx';
import * as S from './PostEdit.style';

import { uploadImagesAPI } from '../../api/uploadImg/uploadImagesAPI';

import { getPostDetailAPI } from '../../api/post/getPostDetailAPI';
import { editPostAPI } from '../../api/post/editPostAPI';
import { apiURL } from '../../api/apiURL';
import { useRecoilValue } from 'recoil';
import { userTokenState, accountNameState } from '../../atoms/Atoms';
import { useNavigate, useParams } from 'react-router-dom';

export default function PostEdit() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [textLength, setTextLength] = useState(0);
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [myProfileImg, setMyProfileImg] = useState('');
  const navigate = useNavigate();
  const token = useRecoilValue(userTokenState);
  const accountname = useRecoilValue(accountNameState);
  const { postId } = useParams();

  useEffect(() => {
    getPostDetailAPI(postId, token).then((data) => {
      console.log(data); //data는 지금 {post: {id:어쩌구.} }, post =postData.post
      setText(data.post.content);
      setTextLength(data.post.content.length);
      setMyProfileImg(data.post.author.image);
      data.post.image && setSelectedImages(data.post.image.split(',')); //이미지가 있다면 설정
      setDisabled(false);
    });
  }, []);

  const textRef = useRef(null);
  const handleTextArea = (e) => {
    setTextLength(e.target.value.length);
    setText(e.target.value);
    if (e.target.value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  //내가 보낼 데이터
  const sendData = {
    post: {
      content: text,
      image: selectedImages.join(','), //"imageurl1, imageurl2" 형식으로 보내야한다.
    },
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append('image', file);
    if (selectedImages.length >= 3) {
      alert('이미지는 최대 3장까지 선택할 수 있습니다.');
    } else {
      uploadImagesAPI(formData).then((data) => {
        setSelectedImages([...selectedImages, `${apiURL}${data[0].filename}`]);
      });
      //상태 업데이트 함수인 setSelectedImages는 비동기적으로 동작하기 때문에,
      //console.log 문이 실행되는 시점에서는 상태가 아직 업데이트되지 않은 상태입니다.
    }
  };

  //textarea 높이 조절
  const handleResizeHeight = () => {
    textRef.current.style.height = 'auto';
    textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  };

  const handleDeleteImage = (index) => {
    setSelectedImages((prevSelectedImages) => {
      const updatedImages = [...prevSelectedImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  // 수정 버튼 //오류나면 e.preventDefalt어쩌구
  const handleUpload = () => {
    console.log('바뀜');
    editPostAPI(postId, sendData, token).then((data) => console.log(data));
    navigate(`/profile/${accountname}`);
  };

  //TopUploadNav 폰트패밀리가 SUITE이 아님.
  return (
    <S.Container>
      <TopUploadNav disabled={disabled} handleUpload={handleUpload} />
      <S.Main>
        <S.ImgProfile src={myProfileImg ? myProfileImg : BasicProfileImg} />
        <S.Article>
          <form id="게시물">
            <S.TextArea
              onInput={handleResizeHeight}
              maxLength="300"
              ref={textRef}
              onChange={handleTextArea}
              rows={1}
              placeholder="게시글 입력하기.."
              value={text}
            ></S.TextArea>
            <S.TextLengthWrap>
              <p>{textLength}/300자</p>
            </S.TextLengthWrap>
            <S.Label htmlFor="InputImg">
              <S.InputImg
                type="file"
                id="InputImg"
                name="Input-img"
                accept="image/*"
                onChange={handleImageSelect}
                multiple
              />
            </S.Label>
          </form>
          <section>
            {selectedImages &&
              (selectedImages.length === 1 ? (
                <S.SingleImgCont>
                  <S.SingleImg src={selectedImages[0]} alt="" />
                  <S.RemoveButton
                    type="button"
                    onClick={() => handleDeleteImage(0)}
                  ></S.RemoveButton>
                </S.SingleImgCont>
              ) : (
                <S.MultipleImgScrollCont>
                  {selectedImages.map((image, index) => (
                    <S.MultipleImgCont key={index}>
                      <S.MultipleImg src={image} alt="" />
                      <S.RemoveButton
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                      ></S.RemoveButton>
                    </S.MultipleImgCont>
                  ))}
                </S.MultipleImgScrollCont>
              ))}
          </section>
        </S.Article>
      </S.Main>
    </S.Container>
  );
}
