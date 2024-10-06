import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closeBanner } from '../../redux/BannerSlice';
import 'user/common/Banner.css';

const Banner = ({positionProp, closeProp}) => {
  const [banner, setBanner] = useState(null);
  const isVisible = useSelector((state) => state.banner.isVisible); // 리덕스에서 배너 보임 여부 가져오기
  const dispatch = useDispatch(); // 리덕스 액션 디스패치

  useEffect(() => {
    let selectData = "";
    if (positionProp === "1") {
      selectData = "bannerheader.json";
    } else if (positionProp === "2") {
      selectData = "bannercontent.json";
    } else if (positionProp === "3") {
      selectData = "bannerfooter.json";
    } else {
      selectData = "";
    } 

    const fetchBanner = async () => {
      try {
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/${selectData}`);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/banners/${positionProp}`);
        if (response.data) {
          console.log("response.data : ", response.data);
          setBanner(response.data);  // 객체로 설정
        }
      } catch (error) {
        console.error('There was an error fetching the banner!', error);
      }
    };

    fetchBanner();
  }, [positionProp]);

  if (!isVisible || !banner) {
    return <p>Loading banner...</p>;
  }

  return (
    <div className='banner-wrap'>
      <div className='banner-view' style={{ backgroundColor: banner.banner_bg_color }}>
        <div>
          {console.log("banner.banner_image_name : ", banner.banner_image_name)}
          <img src={`${process.env.REACT_APP_IMAGE_URL}/images/banner/${banner.banner_image_name}`} alt="banner" />
          {closeProp &&
            <div className='banner-view-close' onClick={() => dispatch(closeBanner())}>
              <i className="bi bi-x-lg fs-4"></i>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Banner;