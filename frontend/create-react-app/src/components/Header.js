function Header({ handleAccountCheck, handleAccountCreate, handleAccountTransfer, handleLogin }) {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1300px', height: '75px', borderBottom: '2px solid teal' }}>
            <nav style={{ fontWeight: 'bold', fontSize: '18.5px' }}>HBbank</nav>
            <nav>
                <a style={{ marginRight: '10px', fontSize: '18.5px' }} onClick={handleAccountCheck}>계좌조회</a>
                <a style={{ marginRight: '10px', fontSize: '18.5px' }} onClick={handleAccountCreate}>계좌개설</a>
                <a style={{ marginRight: '10px', fontSize: '18.5px' }} onClick={handleAccountTransfer}>계좌이체</a>
                <button style={{ fontSize: '18.5px' }} onClick={handleLogin}>로그인</button>
            </nav>
        </header>
    );
}

export default Header;