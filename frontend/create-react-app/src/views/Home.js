import MyButton from '../components/HomeMenuButtons.js';
import Header from '../components/Header.js';


function Home() {
    
    const buttons = [
        {
          title: "조회",
          description: "내 계좌 목록과 잔고 및 이체 내역을 조회합니다.",
          backgroundColor: "teal",
        },
        {
          title: "이체",
          description: "다른 계좌로 송금합니다.",
          backgroundColor: "rgb(64, 128, 128)",
        },
        {
          title: "개설",
          description: "새로운 계좌를 개설합니다.",
          backgroundColor: "gray",
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
            <div style={{ borderTop: '2px solid #F0F0F0', width: '100%', margin: '0', marginTop: '100px' }}></div>
        </>
    );
}

export default Home;