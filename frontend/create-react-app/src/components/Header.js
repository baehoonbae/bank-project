import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function Header() {
    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1000px', height: '75px' }}>
                <nav style={{ color: 'teal', fontWeight: 'bold', fontSize: '22.5px' }}>
                    <Link className="link" to={"/"} style={{ textDecoration: 'none' }}>HBbank</Link>
                </nav>
                <nav>
                    <Link className="link" to={"/login"}>로그인</Link>
                    <span style={{ borderLeft: '1px solid #e0e0e0', margin: '0 10px' }}></span>
                    <Link className="link" to={"/signup"}>회원가입</Link>
                </nav>
            </header>
        </>
    );
}

export default Header;