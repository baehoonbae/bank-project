import logo from './assets/logo.svg';
import './components/app/App.css';

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
  
  return (
    <div className="App">
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleAccountCheck}>계좌조회</button>
      <button onClick={handleAccountTransfer}>계좌이체</button>
    </div>
  );
}

export default App;
