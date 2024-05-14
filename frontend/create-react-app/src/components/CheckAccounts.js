import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CheckAccounts({ clickTime, onAccountClick }) {
  const [name, setName] = useState('OOO');
  const [balance, setBalance] = useState(0);
  const [accounts, setAccounts] = useState([
    { number: '12345678', type: 'Checking', balance: 1000 },
  ]);

  useEffect(() => {
    // 백엔드에서 계좌 목록을 가져오는 함수
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/accounts'); // 백엔드의 API 경로를 입력하세요.
        setAccounts(response.data);
      } catch (error) { 
        console.error('Failed to fetch accounts', error);
      }
    };

    fetchAccounts();
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  const handleClick = () => {
    // 여기에 백엔드에서 데이터를 가져오는 코드를 추가할 수 있습니다.
  };

  return (
    <>
      {clickTime && <p style={{ fontSize: '14px', color: 'gray' }}>조회 기준 일시 : {clickTime}</p>}
      <p style={{ fontSize: '25px', fontWeight: 'bold' }}>{name} 고객님,</p>
      <div style={{ textAlign: 'right', fontSize: '22px' }}>
        <p>총 잔액</p>
        <p style={{
          display: 'inline-block', borderBottom: '3px solid teal', width: '350px', textAlign: 'right',
          marginTop: '-10px', paddingBottom: '10px', fontSize: '25px', fontWeight: 'bold'
        }}>{balance} 원</p>
      </div>
      <ul style={{ margin: 0, padding: 0 }}>
        {accounts.map((account, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <p>{account.number}</p>
              <p>{account.type}</p>
            </div>
            <p>잔액: {account.balance} 원</p>
            <div>
              <button onClick={onAccountClick}>조회</button>
              <button onClick={handleClick}>이체</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CheckAccounts;