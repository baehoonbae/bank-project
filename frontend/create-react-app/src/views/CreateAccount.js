import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Styles from '../styles/Styles.js';
import useCreateValidation from '../hooks/useCreateValidation.js';
import axios from 'axios';

function CreateAccount() {
  const [isMatch, setIsMatch] = useState({
    confirmPassword: false,
  });
  const { inputStyle, buttonStyle, menuStyle, selectedMenuStyle, selectedMenuNameStyle } = Styles();
  const { formState, handleChange, handleBlur, isEmpty, touched } = useCreateValidation();
  const navigate = useNavigate();
  const [menus, setMenus] = useState([
    { name: "HB 올인원통장", description: "HB 올인원통장 설명" },
    { name: "HB 플러스통장", description: "HB 플러스통장 설명" },
    { name: "HB 일상생활비우대통장", description: "HB 일상생활비우대통장 설명" },
    { name: "마이저금통", description: "마이저금통 설명" },
  ]);
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const fields = [
    { name: 'phoneNumber', type: 'tel', placeholder: '휴대폰 번호', onBlur: () => handleBlur({ target: { name: 'phoneNumber', value: formState.phoneNumber } }), errorMessage: '* 휴대폰 번호: 필수 정보입니다.', },
    { name: 'verificationCode', type: 'text', placeholder: '인증 번호', onBlur: () => handleBlur({ target: { name: 'verificationCode', value: formState.verificationCode } }), errorMessage: '* 인증 번호: 필수 정보입니다.' },
    { name: 'password', type: 'password', placeholder: '비밀번호', onBlur: () => handleBlur({ target: { name: 'password', value: formState.password } }), errorMessage: '* 비밀번호: 필수 정보입니다.', },
    {
      name: 'confirmPassword', type: 'password', placeholder: '비밀번호 확인', errorMessage: '* 비밀번호 확인: 필수 정보입니다.', confirmError: '* 비밀번호 확인: 비밀번호가 일치하지 않습니다.',
      onBlur: () => {
        const isPasswordMatch = formState.password === formState.confirmPassword;
        setIsMatch({ confirmPassword: isPasswordMatch });
        handleBlur({ target: { name: 'confirmPassword', value: formState.confirmPassword } });
      },
    },
  ]
  const handleClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleSubmit = (event, selectedMenu) => {
    event.preventDefault();

    // 필수 입력 및 비밀번호 일치 여부를 확인합니다.
    if (Object.values(isEmpty).some(value => value === true) || Object.values(isMatch).some(value => value === false)) {
      return;
    }

    // 서버로 계좌 개설 요청을 보냅니다.
    axios.post('http://localhost:8080/account/create', {}, {
      params: {
        accountType: selectedMenu.name,
        accountPassword: formState.password,
      },
      withCredentials: true,
    })
      .then(response => {
        if (response.status === 200) {
          alert('계좌가 개설되었습니다.');
          navigate('/');
        } else if (response.status === 401) {
          alert('로그인이 필요합니다.');
          navigate('/user/login');
        } else {
          throw new Error('예기치 못한 오류 발생: 계좌개설에 실패했습니다.')
        }
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
                    {field.name === 'confirmPassword' ? (
                      <div style={{ color: 'red', marginBottom: '-25px', fontSize: '14px', }}>
                        {!formState.confirmPassword && touched[field.name] ? (
                          <div style={{ display: 'block' }}>{field.errorMessage}</div>
                        ) : (
                          <div style={{ display: !isMatch.confirmPassword && touched[field.name] ? 'block' : 'none' }}>{field.confirmError}</div>
                        )}
                      </div>) : (
                      <div style={{
                        display: isEmpty[field.name] && touched[field.name] ? 'block' : 'none',
                        fontSize: '14px',
                        color: 'red',
                        marginBottom: '-25px'
                      }}>
                        {field.errorMessage}
                      </div>
                    )}
                    <br />
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