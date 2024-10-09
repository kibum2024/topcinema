import { useSelector } from 'react-redux';
import HeaderMenu from 'user/header/HeaderMenu';
import ContentHome from 'user/content/ContentHome';
import FooterMain from 'user/footer/FooterMain';
import ManagerMenu from 'manager/system/ManagerMenu';
import './App.css';

function App() {
  const isUserType = useSelector((state) => state.userState.userType);

  return (
    <div className="app-main-wrap">
      {isUserType ? 
      (
        <div className='app-manager-content-wrap'>
          <ManagerMenu />
        </div>
      ) : (
        <>
          <div className='app-user-header-wrap'>
            <HeaderMenu />
          </div>
          <div className='app-user-content-wrap'>
            <ContentHome />
          </div>
          <div className='app-user-footer-wrap'>
            <FooterMain />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
