import MyButton from '../components/HomeMenuButtons.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider.js';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    // 로그인 상태 확인 함수
    const checkLoginStatus = async (path) => {
        if (isLoggedIn) {
            try {
                const response = await axios.get('http://localhost:8080/user/check/login', { withCredentials: true });
                if (response.status === 200) {
                    console.log('로그인 상태 확인 성공');
                    navigate(path);
                } else {
                    throw new Error('로그인 상태 확인 실패');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('로그인이 필요합니다.');
            navigate('/user/login');
        }
    };

    const buttonData = [
        {
            title: "조회",
            description: "내 계좌 목록과 잔고 및 이체 내역을 조회합니다.",
            backgroundColor: "teal",
            path: "/user/mypage",
        },
        {
            title: "이체",
            description: "다른 계좌로 송금합니다.",
            backgroundColor: "rgb(64, 128, 128)",
            path: "/account/send",
        },
        {
            title: "금융상품",
            description: "신규 입출금 상품에 가입합니다.",
            backgroundColor: "gray",
            path: "/account/create",
        },
    ];
    const buttons = buttonData.map(button => ({
        ...button,
        onClick: () => checkLoginStatus(button.path),
    }));
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Header /></div>
            <div style={{ borderTop: '2px solid teal', width: '100%', margin: '0' }}></div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                {buttons.map((button, index) => (
                    <MyButton
                        key={index}
                        title={button.title}
                        description={button.description}
                        backgroundColor={button.backgroundColor}
                        onClick={button.onClick}
                    />
                ))}
            </div>
            <Footer />
        </>
    );
}

export default Home;