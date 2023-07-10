import React, { useState } from 'react';
import {
  AlertContainer,
  DeleteConfirm,
  ButtonDiv,
  CancelButton,
  DeleteButton,
} from '../styled';
import ReportModal from './ReportModal';

export default function PostAlert({ setIsReportAlertOpen, setisModalOpen }) {
  const [isReported, setIsReported] = useState(false);

  return (
    <>
      <AlertContainer>
        <DeleteConfirm>신고하시겠어요?</DeleteConfirm>
        <ButtonDiv>
          <CancelButton
            onClick={() => {
              setIsReportAlertOpen(false);
              setisModalOpen(false);
            }}
          >
            취소
          </CancelButton>
          <DeleteButton
            onClick={() => {
              setIsReported(true);
            }}
          >
            신고
          </DeleteButton>
        </ButtonDiv>
      </AlertContainer>

      {isReported ? <ReportModal setisModalOpen={setisModalOpen} /> : null}
    </>
  );
}
