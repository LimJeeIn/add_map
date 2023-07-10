import React from 'react';
import { ReportDone, CancleButton } from '../styled';

export default function ReportCommentAlert({ setisModalOpen }) {
  return (
    <ReportDone>
      신고되었습니다!
      <CancleButton
        onClick={() => {
          setisModalOpen(false);
        }}
      >
        X
      </CancleButton>
    </ReportDone>
  );
}
