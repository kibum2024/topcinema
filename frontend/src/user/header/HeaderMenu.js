import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Banner from 'user/common/Banner';
import 'user/header/HeaderMenu.css';

const HeaderMenu = () => {
  const [menus, setMenus] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [activeMenuMain, setActiveMenuMain] = useState(null);
  const [activeMenuSub, setActiveMenuSub] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/menus.json`);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/menus/1`);
        if (response.data) {
          setMenus(response.data);
        }
      } catch (error) {
        console.error('There was an error fetching the movies!', error);
      }
    };

    fetchMenus();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuMainMouseOver = (MainMenu) => {
    setActiveMenuMain(MainMenu);
  };

  const handleMenuMainMouseLeave = () => {
    setActiveMenuMain(null);
  };

  const handleMenuMainClick = (menu) => {
    alert(`${menu} clicked`);
  };

  const handleMenuSubMouseOver = (menusub) => {
    setActiveMenuSub(menusub);
  };

  const handleMenuSubMouseLeave = () => {
    setActiveMenuSub(null);
  };

  const keepSubMenu = () => {
  };

  return (
    <div className='header-menu-wrap'>
      <div className='header-menu-banner-top'>
        <Banner positionProp={"1"} closeProp={true} />
      </div>
      <div className="header-menu-top-wrap">
        <div className="header-menu-top-left-gnb">
          <ul>
            <li>
              <i className="bi bi-facebook fs-6"></i>
              <a
                href="https://www.facebook.com/LotteCinema.kr"
                target="_blank"
                rel="noopener noreferrer"
                title="롯데시네마 페이스북 새창열림"
              >
                &nbsp;페이스북
              </a>
            </li>
            <li>
              <i className="bi bi-youtube fs-6"></i>
              <a
                href="https://www.youtube.com/channel/UCi4KivcV3a3yhkycFsjpalQ"
                target="_blank"
                rel="noopener noreferrer"
                title="롯데시네마 유튜브 새창열림"
              >
                &nbsp;유튜브
              </a>
            </li>
            <li>
              <i className="bi bi-instagram fs-6"></i>
              <a
                href="https://www.instagram.com/lottecinema_official/"
                target="_blank"
                rel="noopener noreferrer"
                title="롯데시네마 인스타그램 새창열림"
              >
                &nbsp;인스타그램
              </a>
            </li>
          </ul>
        </div>
        <div className="header-menu-top-logo">
          <Link to="/" onClick={() => handleMenuMainClick('mainhome')}>
            <div className="header-menu-top-logo-image">
              <img src={`${process.env.REACT_APP_IMAGE_URL}/images/header/logo_wht.png`} alt="main Log" />
            </div>
          </Link>
        </div>
        <div className="header-menu-top-right-gnb">
          <ul>
            <li><Link to="/">멤버십</Link></li>
            <li><Link to="/">고객센터</Link></li>
            <li><Link to="/">단체관람/대관문의</Link></li>
            <li><Link to="/">로그인</Link></li>
          </ul>
        </div>
      </div>

      <div className={`header-menu-bottom-wrap ${isSticky ? 'sticky' : ''}`}>
        <div className="header-menu-bottom-menu-wrap">
          <div className="header-menu-bottom-menu-main">
            <ul>
              {menus.filter(menu => menu.menu_kind === "1" && menu.menu_type === "1").map((mainMemu, index) => (
                <li
                  key={index}
                  className="header-menu-bottom-menu-main-list"
                  onMouseOver={() => handleMenuMainMouseOver(mainMemu.menu_main)}
                  onClick={() => handleMenuMainClick(mainMemu.menu_url)}
                >
                  {mainMemu.menu_name}
                </li>
              ))}
            </ul>
          </div>
          <div className="header-menu-bottom-right-gnb">
            <ul>
              <li><Link to="/"><i class="bi bi-person fs-6"></i>회원가입</Link></li>
              <li><Link to="/"><i class="bi bi-file-arrow-down fs-6"></i>바로 예매</Link></li>
              <li><Link to="/"><i className="bi bi-list fs-6"></i></Link></li>
            </ul>
          </div>
        </div>
        <div>
          {activeMenuMain && (
            <div
              className="header-menu-bottom-menu-sub"
              onMouseOver={() => keepSubMenu()}
              onMouseLeave={handleMenuMainMouseLeave}
            >
              <ul>
                {menus.filter(menu => menu.menu_main === activeMenuMain && menu.menu_kind === "2" && menu.menu_type === "1")
                  .map((menusub, index) => (
                    <li
                      key={index}
                      className="header-menu-bottom-menu-sub-list"
                      onMouseOver={() => handleMenuSubMouseOver(menusub.menu_sub)}
                    >
                      {menusub.menu_name}
                    </li>
                  ))}
              </ul>
              <div className="header-menu-bottom-menu-small">
                {activeMenuSub && (
                  <div
                    className="header-menu-bottom-menu-small-size"
                    onMouseLeave={handleMenuSubMouseLeave}
                  >
                    <ul>
                      {menus.filter(menu => menu.menu_main === activeMenuMain && menu.menu_sub === activeMenuSub && menu.menu_kind === "3" && menu.menu_type === "1")
                        .map((menusmall, index) => (
                          <li key={index}
                            className="header-menu-bottom-menu-small-list"
                          >
                            {menusmall.menu_name}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;