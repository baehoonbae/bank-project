import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1100px', height: '75px' }}>
                <nav style={{ color: 'teal', fontWeight: 'bold', fontSize: '22.5px' }}>
                    <Link className="link" to={"/"} style={{ textDecoration: 'none' }}>HBbank</Link>
                </nav>
                <nav>
                    <Link className="link" to={"/user/signup"} style={{ display: localStorage.getItem('token') ? 'none' : '' }}>회원가입</Link>
                    <span style={{ borderLeft: '1px solid #e0e0e0', margin: '0 10px', display: localStorage.getItem('token') ? 'none' : '' }}></span>
                    {localStorage.getItem('token') ? (
                        <Link className="link" to={"/"} onClick={handleLogOut}>로그아웃</Link>
                    ) : (
                        <Link className="link" to={"/user/login"}>로그인</Link>
                    )}
                </nav>
            </header>
        </>
    );
}

export default Header;