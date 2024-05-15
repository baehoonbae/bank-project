import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import Styles from '../styles/Styles.js';
import SendComponent from '../components/SendComponent.js';

function Send({ accountProp }) {
  const [menus, setMenus] = useState([
    { name: "계좌이체" },
  ]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [account, setAccount] = useState(""); // 계좌번호
  const { menuStyle, selectedMenuStyle, selectedMenuNameStyle } = Styles();
  useEffect(() => {
    if (accountProp) {
      setAccount(accountProp.number);
    }
  }, [accountProp],);
  const handleClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Header /></div>
      <div style={{ borderTop: '2px solid teal', width: '100%', margin: '0' }}></div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '1100px', marginTop: '30px' }}>
          <div style={{ flex: 2.4, marginRight: '20px', textAlign: 'left' }}>
            <header style={{ marginBottom: '10px' }}>
              <span style={{ color: 'black', fontWeight: 'bold', fontSize: '22px' }} >이체 </span>
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
              <SendComponent account={account} />
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Send;