import logo from './assets/logo.svg';
import './components/app/App.css';
import Header from './components/Header.js';
import MyButton from './components/HomeMenuButtons.js';

function App() {

  const handleLogin = () => {
    // 로그인 로직
  };

  const handleAccountCheck = () => {
    // 계좌조회 로직
  };

  const handleAccountTransfer = () => {
    // 계좌이체 로직
  };

  const handleAccountCreate = () => {
    // 계좌개설 로직
  };

  const buttons = [
    {
      title: "조회",
      description: "내 계좌 목록과 잔고 및 이체 내역을 조회합니다.",
      backgroundColor: "teal",
      onClick: handleAccountCheck,
    },
    {
      title: "이체",
      description: "다른 계좌로 송금합니다.",
      backgroundColor: "rgb(64, 128, 128)",
      onClick: handleAccountTransfer,
    },
    {
      title: "개설",
      description: "새로운 계좌를 개설합니다.",
      backgroundColor: "gray",
      onClick: handleAccountCreate,
    },
  ];

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center' }}><Header handleLogin={handleLogin} /></div>
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
      <div style={{ borderTop: '2px solid #F0F0F0', width: '100%', margin: '0',  marginTop: '100px' }}></div>
    </div>
  );
}

export default App;
