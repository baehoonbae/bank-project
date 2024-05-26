import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Styles from '../styles/Styles.js';
import useCreateValidation from '../hooks/useCreateValidation.js';

function CreateAccount() {
  const [selectedMenu, setSelectedMenu] = useState({
  });

  useEffect(() => {
    const storedMenu = localStorage.getItem('selectedMenu');
    if (storedMenu) {
      setSelectedMenu(JSON.parse(storedMenu));
    }
    localStorage.removeItem('selectedMenu');
  }, []);

  useEffect(() => {
    console.log(selectedMenu);
  }, [selectedMenu]);

  const { inputStyle, buttonStyle, menuStyle, selectedMenuStyle, selectedMenuNameStyle } = Styles();
  const { formState, handleChange, handleBlur, isEmpty, touched, } = useCreateValidation();
  const navigate = useNavigate();
  const [isMatch, setIsMatch] = useState({
    confirmPassword: false,
  });
  const [menus, setMenus] = useState([
    { name: "HB 올인원통장", description: "HB 올인원통장 설명" },
    { name: "HB 플러스통장", description: "HB 플러스통장 설명" },
    { name: "HB 일상생활비우대통장", description: "HB 일상생활비우대통장 설명" },
    { name: "마이저금통", description: "마이저금통 설명" },
  ]);
  const fields = [
    { name: 'phoneNumber', type: 'tel', placeholder: '휴대폰 번호', onBlur: () => handleBlur({ target: { name: 'phoneNumber', value: formState.phoneNumber } }), errorMessage: '* 휴대폰 번호: 필수 정보입니다.', },
    { name: 'verificationCode', type: 'text', placeholder: '인증 번호', onBlur: () => handleBlur({ target: { name: 'verificationCode', value: formState.verificationCode } }), errorMessage: '* 인증 번호: 필수 정보입니다.' },
    { name: 'password', type: 'password', placeholder: '비밀번호', onBlur: () => handleBlur({ target: { name: 'password', value: formState.password } }), errorMessage: '* 비밀번호: 필수 정보입니다.', },
    {
      name: 'confirmPassword', type: 'password', placeholder: '비밀번호 확인', errorMessage: '* 비밀번호 확인: 필수 정보입니다.', confirmError: '* 비밀번호 확인: 비밀번호가 일치하지 않습니다.',
      onBlur: () => {
        const isPasswordMatch = formState.password === formState.confirmPassword;
        const isEmpty = !formState.confirmPassword;
        if (isPasswordMatch && !isEmpty) {
          setIsMatch(prevState => ({
            ...prevState,
            confirmPassword: true,
          }));
        } else {
          setIsMatch(prevState => ({
            ...prevState,
            confirmPassword: false,
          }));
        }
        handleBlur({
          target: {
            name: 'confirmPassword',
            value: formState.confirmPassword,
          },
        });
      },
    }

  ]
  const handleClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const accountType = selectedMenu.name;
    const accountPassword = formState['password'];
    const confirmPassword = formState['confirmPassword'];
    if (accountPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    fetch('http://localhost:8080/account/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ accountType, accountPassword }),
    })
      .then(response => {
        if (response.status === 200) {
          navigate('/');
        } else {
          throw new Error('계좌개설에 실패했습니다.')
        }
        return response.json()
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

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
              <form onSubmit={(event) => handleSubmit(event, selectedMenu)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {fields.map((field) => (
                  <label key={field.name}>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formState[field.name]}
                      placeholder={field.placeholder}
                      style={inputStyle}
                      onChange={handleChange}
                      onBlur={field.onBlur}
                    />
                    <div style={{ display: isEmpty[field.name] && touched[field.name] ? 'block' : 'none', color: 'red', marginBottom: '-25px' }}>{field.errorMessage}</div><br />
                  </label>
                ))}
                <input type="submit" value="계좌 개설" style={buttonStyle} />
              </form>
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateAccount;