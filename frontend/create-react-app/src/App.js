import logo from './assets/logo.svg';
import './components/app/App.css';
import MyButton from './components/HomeMenuButtons.js';
import Header from './components/Header.js';
import Login from './views/Login';
import Home from './views/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
