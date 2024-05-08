import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function Header() {
    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1300px', height: '75px' }}>
                <nav style={{ color: 'teal', fontWeight: 'bold', fontSize: '25.5px' }}>HBbank</nav>
                <nav>
                    <Link to={"/login"}>로그인</Link>
                </nav>
            </header>
        </>
    );
}

export default Header;