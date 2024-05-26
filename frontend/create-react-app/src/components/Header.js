import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import axios from 'axios';

function Header() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        setIsLoggedIn(false);  // 로그아웃 함수를 실행합니다.
        if (isLoggedIn) {
            try {
                const response = await axios.get('http://localhost:8080/user/logout', { withCredentials: true });
                if (response.status === 200) {
                    console.log('로그아웃 성공');
                } else {
                    throw new Error('로그아웃 실패');
                }
            } catch (error) {
                console.error(error);
            }
        }
        navigate('/');
    }

    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1100px', height: '75px' }}>
                <nav style={{ color: 'teal', fontWeight: 'bold', fontSize: '22.5px' }}>
                    <Link className="link" to={"/"} style={{ textDecoration: 'none' }}>HBbank</Link>
                </nav>
                <nav>
                    <Link className="link" to={"/user/signup"} style={{ display: isLoggedIn ? 'none' : '' }}>회원가입</Link>
                    <span style={{ borderLeft: '1px solid #e0e0e0', margin: '0 10px', display: localStorage.getItem('token') ? 'none' : '' }}></span>
                    {isLoggedIn ? (
                        <Link className="link" to={"/"} onClick={handleLogOut}>로그아웃</Link>
                    ) : (
                        <Link className="link" to={"/user/login"}>로그인</Link>
                    )}
                </nav>
            </header>
        </>
    );
}

export default Header;