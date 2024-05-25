import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider.js';

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          console.log('로그인 성공');
          navigate('/');
        } else {
          throw new Error('로그인 실패')
        }
        return response.json()
      })
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
          <Link className="link" to={"/user/signup"} style={{ marginTop: '30px' }}>회원가입 &gt;</Link>
        </div>
      </div >
      <Footer />
    </>
  );
}

export default Login;