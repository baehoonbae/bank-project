import MyButton from '../components/HomeMenuButtons.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const buttons = [
        {
            title: "조회",
            description: "내 계좌 목록과 잔고 및 이체 내역을 조회합니다.",
            backgroundColor: "teal",
            onClick: () => navigate('/user/mypage'),
        },
        {
            title: "이체",
            description: "다른 계좌로 송금합니다.",
            backgroundColor: "rgb(64, 128, 128)",
            onClick: () => navigate('/account/send'),
        },
        {
            title: "금융상품",
            description: "신규 입출금 상품에 가입합니다.",
            backgroundColor: "gray",
            onClick: () => navigate('/account/create'),
        },
    ];

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