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
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/mypage" element={<MyPage />} />
          <Route path="/account/send" element={<Send />} />
          <Route path="/account/create" element={<CreateAccount />} />
          <Route path="/user/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
