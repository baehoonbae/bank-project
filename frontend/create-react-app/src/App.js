import './components/app/App.css';
import Login from './views/Login';
import Home from './views/Home';
import MyPage from './views/MyPage';
import Send from './views/Send';
import CreateAccount from './views/CreateAccount';
import SignUp from './views/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/send" element={<Send />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
