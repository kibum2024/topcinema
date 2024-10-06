import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import TabMenu from 'manager/system/TabMenu';
import { IoImages, IoBusiness, IoSparkles, IoStorefront, IoTicket, IoReaderSharp, IoSettingsSharp, IoListCircleOutline } from "react-icons/io5"; //영화및상영관리, 영화관, 상품, 티켓, 보고, 시스템관리

function ManagerMenu() {
  const iconMap = {
    IoImages: IoImages,
    IoBusiness: IoBusiness,
    IoSparkles: IoSparkles,
    IoStorefront: IoStorefront,
    IoTicket: IoTicket,
    IoReaderSharp: IoReaderSharp,
    IoSettingsSharp: IoSettingsSharp,
    IoListCircleOutline: IoListCircleOutline,
  };  
  
  const tabsRef = useRef(null);
  const [menus, setMenus] = useState([]);
  const [selectedMainMenuCode, setSelectedMainMenuCode] = useState("");
  const [selectedMainMenuName, setSelectedMainMenuName] = useState("");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/menus/2`);
        if (response.data) {
          setMenus(response.data);
          const firstMenu = response.data.find(menu => menu.menu_kind === "1" && menu.menu_type === "2");
          if (firstMenu) {
            handleMainCodeClick(firstMenu.menu_main, firstMenu.menu_name); 
          }
        }
      } catch (error) {
        console.error('There was an error fetching the movies!', error);
      }
    };

    fetchMenus();
  }, []);

  const DynamicIcon = ({ iconName, size = 24, color = "black" }) => {
    // 매핑된 아이콘에서 아이콘 이름으로 해당 컴포넌트를 찾음
    const IconComponent = iconMap[iconName];
  
    // 아이콘이 존재하면 렌더링, 없으면 기본값 렌더링
    return IconComponent ? <IconComponent size={size} color={color} /> : <p>아이콘 없음</p>;
  };

  const addTabToTabs = (tabName, componentName) => {
    if (tabsRef.current) {
      tabsRef.current.addTab(tabName, componentName);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // 브라우저 창 크기 변경 시 크기 업데이트
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMainCodeClick = (menu_main, menu_name) => {
    setSelectedMainMenuCode(menu_main);
    setSelectedMainMenuName(menu_name);
  }

  return (
    <div
      style={{
        display: 'flex', 
        width: `${windowSize.width}px`,
        height: `${windowSize.height - 25}px`,
        }}
    >
      <div 
        style={{
          backgroundColor: 'rgb(0, 55, 118)', 
          borderRadius: '0px 15px 15px 0px',
          color: 'white',
          height: '100%',
          width: '210px',
          padding: '10px 0px'
        }}
      >
        <div
          style={{
            color: 'rgb(95, 145, 214)',
            height: '50px',
            width: '195px',
            padding: '10px 0px',
            fontWeight: 'bold',
            borderBottom: '1px solid rgb(95, 145, 214)',
            margin: '0px 0px 0px 5px',
          }}
        >
          <div
            style={{
              height: '25px',
              textAlign: 'left',
              marginLeft: '15px',
            }}
          >
            <img
              style={{
                width: '150px',
                height: '25px',
                marginLeft: '5px',
              }} 
              src={`${process.env.REACT_APP_IMAGE_URL}/images/header/logo_wht.png`} alt="main Log" 
            />
          </div>
        </div>
        <div
          style={{
            padding: '10px 0px 0px 20px',
            width: '210px',
          }}
        >
          <div
            style={{
              height: '40px',
              lineHeight: '40px',
              textAlign: 'left',
              fontWeight: 'bold',
              userSelect: 'none',
            }}
          >
            {/* <DynamicIcon iconName="IoListCircleOutline" size={20} color="white" /> */}
            {selectedMainMenuName}
          </div>
          {menus.filter(menu => menu.menu_kind !== "1" && menu.menu_type === "2" && menu.menu_main === selectedMainMenuCode)
            .map((subMemu, index) => (
              <div key={index} style={{position: 'relative'}}>
                <div
                  style={{
                    height: '30px', 
                    lineHeight: '30px', 
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderLeft: '1px solid white',
                    paddingLeft: '10px',
                    userSelect: 'none',
                  }}
                  onClick={() => addTabToTabs(subMemu.menu_name, subMemu.menu_component)}
                  >
                    {subMemu.menu_name}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div
        style={{
          width: '100%'
        }}
      >
        <div
          style={{
            display: 'flex', 
            justifyContent: 'left',
            alignItems: 'center',
            height: '40px',
            lineHeight: '40px',
            borderTop: '1px solid rgb(202, 202, 200)',
            borderBottom: '1px solid rgb(202, 202, 200)',
            padding: '0px 10px',
          }}
        >
          <div
            style={{
              display: 'flex', 
              justifyContent: 'left',
              alignItems: 'center',
              width: '80%'
            }}
          >
            {menus.filter(menu => menu.menu_kind === "1" && menu.menu_type === "2")
              .map((mainMemu, index) => (
                <div
                  style={{
                    display: 'flex', 
                    justifyContent: 'left',
                    alignItems: 'center',
                    width: 'auto',
                    padding: '0px 10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMainCodeClick(mainMemu.menu_main, mainMemu.menu_name)}
                >
                  <div
                    style={{
                      display: 'flex', 
                      alignItems: 'center',
                      height: '25px',
                      lineHeight: '25px',
                      paddingTop: '0px'
                    }}
                  >
                    <DynamicIcon iconName={mainMemu.menu_icon} size={20} color="rgb(127, 127, 127)" />
                  </div>
                  <div
                    style={{
                      height: '25px',
                      lineHeight: '25px',
                      width: 'auto',
                      padding: '0px 6px',
                      userSelect: 'none',
                    }}
                  >
                    {mainMemu.menu_name}
                  </div>
                </div>
            ))}    
          </div>
        </div>
        <div
          style={{
            height: `${windowSize.height - 48}px`,
          }}
        >
          <TabMenu ref={tabsRef} />
        </div>
      </div>
    </div>
  );
}

export default ManagerMenu;
