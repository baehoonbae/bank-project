import React, { useState } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에 로그인 로직을 구현합니다.
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Header /></div>
      <div style={{ borderTop: '2px solid teal', width: '100%', margin: '0' }}></div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loginForm">
          <img src="/img/loginImage.png" alt="loginImage" style={{ width: '130px', height: '130px', marginTop: '-60px' }} />
          <h2>로그인</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', width: '300px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', flex: 7, minHeight: '85px', margin: '10px' }}>
              <input type="text" value={username} placeholder="아이디 입력" style={{ width: '100%', height: '40%' }} onChange={handleUsernameChange} /><br />
              <input type="password" value={password} placeholder="비밀번호 입력" style={{ width: '100%', height: '40%' }} onChange={handlePasswordChange} />
            </label>
            <input className="loginButton" type="submit" value="로그인" />
          </form>
          <Link className="link" to={"/signup"} style={{marginTop:'30px'}}>회원가입 &gt;</Link>
        </div>
      </div >
      <Footer />
    </>
  );
}

export default Login;