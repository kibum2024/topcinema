import React from 'react';
import 'user/footer/FooterMain.css';
import Banner from 'user/common/Banner';

const FooterMain = () => {
  return (
    <div classNameName='footer-main-wrap'>
      <div className='footer-main-banner-top'>
        <Banner positionProp = {"2"} closeProp = {false} />
      </div>
      <div className='footer-main-banner-bottom'>
        <Banner positionProp = {"3"} closeProp = {false} />
      </div>
      <div className="footer-main-info">
        <div className="footer-main-logo"><img src={`${process.env.REACT_APP_IMAGE_URL}/images/footer/logo_footer.gif`} alt="logo Footer" /></div>
        <div className="footer-main-comment">회사소개 | 이용약관 | 개인정보처리방침 | 이메일무단수집거부 | 고정형 영상정보처리기기 운영 및 관리방침 | L.POINT회원안내 | 배정기준 | 채용안내 | 광고/임대문의 | 사회적책임</div>
        <div className="footer-main-comment">서울특별시 송파구 올림픽로 295 삼성생명 잠실빌딩 18F</div>
        <div className="footer-main-comment">대표 이메일 lottecultureworks@lotte.net | 고객센터 1544-8855 (유료) | 사업자등록번호 313-87-00979 | 통신판매업신고번호 제1184호사업자정보확인</div>
        <div className="footer-main-comment">대표이사 최병환 | 개인정보 보호 책임자 이수민 | 호스팅 제공자 롯데이노베이트</div>
        <div className="footer-main-comment">Copyright © LOTTE Cultureworks All Right Reserved.</div>
      </div>
    </div>
  );
}

export default FooterMain;
