import React, { createContext, useState, useContext, useEffect } from 'react';

// 로그인 상태를 저장할 Context를 생성합니다.
const AuthContext = createContext();

// AuthProvider 컴포넌트를 정의합니다. 이 컴포넌트는 자식 컴포넌트에게 로그인 상태를 제공합니다.
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    // 앱이 로드될 때 로컬 스토리지에서 로그인 상태를 불러옵니다.
    useEffect(() => {
        const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(JSON.parse(savedIsLoggedIn));
    }, []);

    // 로그인 상태가 변경될 때마다 로컬 스토리지에 로그인 상태를 저장합니다.
    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

// useAuth 커스텀 훅을 정의합니다. 이 훅을 사용하면 컴포넌트에서 로그인 상태를 쉽게 사용할 수 있습니다.
export function useAuth() {
    return useContext(AuthContext);
}