import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { Styles } from '../styles/Styles.js';
import UserFormValidation from '../hooks/UserFormValidation.js';

function SignUp() {
    const { inputStyle, buttonStyle } = Styles();
    const navigate = useNavigate();
    const { formState, handleChange, handleBlur, isEmpty, touched } = UserFormValidation();
    const [isDuplicate, setIsDuplicate] = useState({
        username: false,
        email: false,
    });
    const fields = [
        {
            name: 'username', type: 'text', placeholder: '아이디', errorMessage: '* 아이디: 필수 정보입니다.', duplicateError: '* 아이디: 이미 사용중인 아이디입니다.',
            onBlur: () => {
                handleBlur({ target: { name: 'username', value: formState.username } });
                fetch(`http://localhost:8080/user/check/username?username=${formState.username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        if (response.status === 409) {
                            setIsDuplicate(prevState => ({
                                ...prevState,
                                username: true,
                            }));
                        } else {
                            setIsDuplicate(prevState => ({
                                ...prevState,
                                username: false,
                            }));
                        }
                    });
            },
        },
        { name: 'password', type: 'password', placeholder: '비밀번호', onBlur: () => handleBlur({ target: { name: 'password', value: formState.password } }), errorMessage: '* 비밀번호: 필수 정보입니다.' },
        { name: 'name', type: 'text', placeholder: '이름', onBlur: () => handleBlur({ target: { name: 'name', value: formState.name } }), errorMessage: '* 이름: 필수 정보입니다.' },
        {
            name: 'email', type: 'email', placeholder: '이메일', errorMessage: '* 이메일: 필수 정보입니다.', duplicateError: '* 이메일: 이미 사용중인 이메일입니다.',
            onBlur: () => {
                handleBlur({ target: { name: 'email', value: formState.email } });
                fetch(`http://localhost:8080/user/check/email?email=${formState.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        if (response.status === 409) {
                            setIsDuplicate(prevState => ({
                                ...prevState,
                                email: true,
                            }));
                        } else {
                            setIsDuplicate(prevState => ({
                                ...prevState,
                                email: false,
                            }));
                        }
                    });
            },
        },
        { name: 'birthDate', type: 'date', placeholder: '생년월일', onBlur: () => handleBlur({ target: { name: 'birthDate', value: formState.birthDate } }), errorMessage: '* 생년월일: 필수 정보입니다.' },
        { name: 'phoneNumber', type: 'tel', placeholder: '전화번호', onBlur: () => handleBlur({ target: { name: 'phoneNumber', value: formState.phoneNumber } }), errorMessage: '* 전화번호: 필수 정보입니다.' },
        { name: 'verificationCode', type: 'text', placeholder: '인증번호', onBlur: () => handleBlur({ target: { name: 'verificationCode', value: formState.verificationCode } }), errorMessage: '* 인증번호: 필수 정보입니다.' },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            username: formState.username,
            password: formState.password,
            name: formState.name,
            email: formState.email,
            birthDate: formState.birthDate,
            phoneNumber: formState.phoneNumber,
        };
        fetch('http://localhost:8080/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if (response.status === 200) {
                    navigate('/');
                } else {
                    throw new Error('회원가입에 실패했습니다.')
                }
                return response.json()
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Header />
                <div style={{ borderTop: '2px solid teal', width: '100%', margin: '0' }}></div>
                <div className="signUpForm">
                    <img src="/img/signUpImage.png" alt="signUpImage" style={{ width: '130px', height: '130px' }} />
                    <h2>회원가입</h2>
                    <form onSubmit={handleSubmit}>
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
                                <div style={{ display: isEmpty[field.name] && touched[field.name] ? 'block' : 'none', color: 'red', marginBottom: '-25px' }}>{field.errorMessage}</div>
                                <div style={{ display: isDuplicate[field.name] && touched[field.name] ? 'block' : 'none', color: 'red', marginBottom: '-25px' }}>{field.duplicateError}</div>
                                <br />
                            </label>
                        ))}
                        <input type="submit" value="회원가입" style={buttonStyle} />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;