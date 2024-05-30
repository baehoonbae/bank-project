import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { Styles } from '../styles/Styles.js';
import useFormValidation from '../hooks/useFormValidation.js';
import axios from 'axios';

function SignUp() {
    const { inputStyle, buttonStyle, sendStyle } = Styles();
    const navigate = useNavigate();
    const { formState, handleChange, handleBlur, isEmpty, touched } = useFormValidation();
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
        { name: 'birthDate', type: 'date', placeholder: '생년월일', onBlur: () => handleBlur({ target: { name: 'birthDate', value: formState.birthDate } }), errorMessage: '* 생년월일: 필수 정보입니다.' },
        { name: 'phoneNumber', type: 'number', placeholder: '전화번호', onBlur: () => handleBlur({ target: { name: 'phoneNumber', value: formState.phoneNumber } }), errorMessage: '* 전화번호: 필수 정보입니다.' },
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
        { name: 'verificationCode', type: 'number', placeholder: '인증번호', onBlur: () => handleBlur({ target: { name: 'verificationCode', value: formState.verificationCode } }), errorMessage: '* 인증번호: 필수 정보입니다.' },
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
            credentials: 'include',
        })
            .then(response => {
                if (response.status === 200) {
                    navigate('/');
                } else if (response.status === 401) {
                    alert('이메일 인증이 필요합니다.');
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

    const handleSend = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/user/email/verification-request', {}, {
                params: {
                    email: formState.email,
                },
                withCredentials: true,
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log('이메일 전송 성공');
                    } else {
                        throw new Error('이메일 전송 실패');
                    }
                })
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleVerify = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/user/email/verification', {}, {
                params: {
                    authNumber: formState.verificationCode,
                },
                withCredentials: true,
            })
                .then(response => {
                    if (response.status === 200) {
                        alert('인증 성공');
                    } else if (response.status === 401) {
                        alert('인증 실패');
                    } else {
                        throw new Error('인증 실패');
                    }
                })
        } catch (error) {
            alert('인증 실패');
        }
    }

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
                            <label key={field.name} style={{ display: 'flex', flexDirection: 'column' }}>
                                {field.name === 'email' || field.name === 'verificationCode' ?
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formState[field.name]}
                                            placeholder={field.placeholder}
                                            style={{ ...inputStyle, width: '230px' }}
                                            onChange={handleChange}
                                            onBlur={field.onBlur}
                                        />
                                        {field.name === 'email' && <button type='button' style={sendStyle} onClick={handleSend}>전송</button>}
                                        {field.name === 'verificationCode' && <button type='button' style={sendStyle} onClick={handleVerify}>확인</button>}
                                    </div> :
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formState[field.name]}
                                        placeholder={field.placeholder}
                                        style={{ ...inputStyle, width: '300px' }}
                                        onChange={handleChange}
                                        onBlur={field.onBlur}
                                    />
                                }
                                <div style={{ display: isEmpty[field.name] && touched[field.name] ? 'block' : 'none', color: 'red', marginBottom: '-25px' }}>{field.errorMessage}</div>
                                <div style={{ display: isDuplicate[field.name] && touched[field.name] ? 'block' : 'none', color: 'red', marginBottom: '-25px' }}>{field.duplicateError}</div>
                                <br />
                            </label>
                        ))}
                        <input type="submit" value="회원가입" style={buttonStyle} />
                    </form>
                </div>
            </div >
            <Footer />
        </>
    );
}

export default SignUp;