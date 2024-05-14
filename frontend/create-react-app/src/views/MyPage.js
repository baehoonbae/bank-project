import React, { useState } from 'react';
import CheckAccounts from '../components/CheckAccounts.js';
import Check from '../components/Check.js';
import SendHistory from '../components/SendHistory.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Styles from '../styles/Styles.js';

function MyPage() {
  const [menus, setMenus] = useState([
    { name: "HBbank 계좌조회", component: <CheckAccounts onAccountClick={() => setSelectedMenu({ name: "계좌 상세 조회", component: <Check /> })} /> },
    { name: "거래내역 조회", component: <SendHistory /> },
  ]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [clickTime, setClickTime] = useState(null);
  const [selectedMenuName, setSelectedMenuName] = useState(null);
  const { menuStyle, selectedMenuStyle, selectedMenuNameStyle } = Styles();

  const handleClick = (menu, account = null) => {
    setSelectedMenu(menu);
    setSelectedAccount(account);
    setClickTime(new Date().toLocaleString());
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Header /></div>
      <div style={{ borderTop: '2px solid teal', width: '100%', margin: '0' }}></div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '1100px', marginTop: '30px' }}>
          <div style={{ flex: 2.4, marginRight: '20px', textAlign: 'left' }}>
            <header style={{ marginBottom: '10px' }}>
              <span style={{ color: 'black', fontWeight: 'bold', fontSize: '22px' }} >조회 </span>
            </header>
            {menus.map((menu, index) => (
              <p key={index}
                style={(selectedMenu === menu || (selectedMenu && selectedMenu.name === "계좌 상세 조회" && menu.name === "HBbank 계좌조회")) ? selectedMenuStyle : menuStyle}
                onClick={() => handleClick(menu)}>
                {menu.name} {selectedMenu === menu && '>'}
              </p>
            ))}
          </div>
          {selectedMenu &&
            <div style={{ flex: 7, border: '1px solid #c8c8c8', borderRadius: '5px', padding: '20px', textAlign: 'left' }}>
              <span style={selectedMenuNameStyle}>{selectedMenu.name}</span><br />
              <div style={{ borderTop: '2px solid #F0F0F0', width: '100%', marginTop: '12px', marginBottom: '15px' }}></div>
              {React.cloneElement(selectedMenu.component, { clickTime, account: selectedAccount })}
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyPage;