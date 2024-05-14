import React, { useState } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { Styles } from '../styles/Styles.js';

function SignUp() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const { inputStyle, buttonStyle } = Styles();

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Header /></div>
            <div style={{ borderTop: '2px solid teal', width: '100%', margin: '0' }}></div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="signUpForm">
                    <img src="/img/signUpImage.png" alt="signUpImage" style={{ width: '130px', height: '130px' }} />
                    <h2>회원가입</h2>
                    <form onSubmit={handleSubmit}>
                        <label><input type="text" value={id} placeholder="아이디" style={inputStyle} onChange={(e) => setId(e.target.value)} /><br /></label>
                        <label><input type="password" value={password} placeholder="비밀번호" style={inputStyle} onChange={(e) => setPassword(e.target.value)} /><br /></label>
                        <label><input type="text" value={name} placeholder="이름" style={inputStyle} onChange={(e) => setName(e.target.value)} /><br /></label>
                        <label><input type="email" value={email} placeholder="이메일" style={inputStyle} onChange={(e) => setEmail(e.target.value)} /><br /></label>
                        <label><input type="date" value={birthDate} placeholder="생년월일" style={inputStyle} onChange={(e) => setBirthDate(e.target.value)} /><br /></label>
                        <label><input type="tel" value={phoneNumber} placeholder="전화번호" style={inputStyle} onChange={(e) => setPhoneNumber(e.target.value)} /><br /></label>
                        <label><input type="text" value={verificationCode} placeholder="인증번호" style={inputStyle} onChange={(e) => setVerificationCode(e.target.value)} /><br /></label>
                        <input type="submit" value="회원가입" style={buttonStyle} />
                    </form>
                </div>
            </div >
            <Footer />
        </>
    );
}

export default SignUp;