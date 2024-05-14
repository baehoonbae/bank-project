import React, { useState } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Styles from '../styles/Styles.js';

function CreateAccount() {

  const [menus, setMenus] = useState([
    { name: "HB 올인원통장", description: "HB 올인원통장 설명" },
    { name: "HB 플러스통장", description: "HB 플러스통장 설명" },
    { name: "HB 일상생활비우대통장", description: "HB 일상생활비우대통장 설명" },
    { name: "마이저금통", description: "마이저금통 설명" },
  ]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const { inputStyle, buttonStyle, menuStyle, selectedMenuStyle, selectedMenuNameStyle } = Styles();

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
              <span style={{ color: 'black', fontWeight: 'bold', fontSize: '22px' }} >입출금 상품/가입 </span>
            </header>
            {menus.map((menu, index) => (
              <p key={index}
                style={selectedMenu === menu ? selectedMenuStyle : menuStyle}
                onClick={() => handleClick(menu)}>
                {menu.name} {selectedMenu === menu && '>'}
              </p>
            ))}
          </div>
          {selectedMenu &&
            <div style={{ flex: 7, border: '2px solid rgb(229, 229, 229)', padding: '20px', textAlign: 'left' }}>
              <span style={selectedMenuNameStyle}>{selectedMenu.name}</span>
              <div style={{ borderTop: '2px solid #F0F0F0', width: '100%', marginTop: '12px' }}></div>
              <p style={{ marginBottom: '100px' }}>{selectedMenu.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label><input type="tel" placeholder='휴대폰 번호' style={inputStyle}></input><br /></label>
                <label><input type="text" placeholder='인증 번호' style={inputStyle} ></input><br /></label>
                <label><input type="password" placeholder='사용할 비밀번호 4자리' style={inputStyle}></input><br /></label>
                <label><input type="password" placeholder='비밀번호 확인' style={inputStyle}></input><br /></label>
                <input type="submit" value="계좌 개설" style={buttonStyle} />
              </div>
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateAccount;