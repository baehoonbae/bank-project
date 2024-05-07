function Header({ handleLogin }) {
    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1300px', height: '75px' }}>
                <nav style={{ color: 'teal', fontWeight: 'bold', fontSize: '25.5px' }}>HBbank</nav>
                <nav><a style={{ fontSize: '16.5px' }} onClick={handleLogin}>로그인</a></nav>
            </header>
        </>
    );
}

export default Header;