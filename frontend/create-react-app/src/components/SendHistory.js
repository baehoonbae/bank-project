import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Styles } from '../styles/Styles.js';

function SendHistory({ account: accountProp }) {
    const [accountNumber, setAccountNumber] = useState('');
    const [account, setAccount] = useState(""); // 계좌번호
    const [month, setMonth] = useState(""); // 월별조회
    const [period, setPeriod] = useState({ start: "", end: "" }); // 조회기간
    const labelStyle = {
        paddingTop: '17.5px',
        paddingBottom: '17.5px',
        backgroundColor: '#f1f1f1',
        paddingRight: '50px',
        width: '130px'
    };

    const inputStyle = {
        marginTop: '17.5px',
        marginBottom: '17.5px',
        paddingRight: '30px',
        marginLeft: '10px'
    };

    const { buttonStyle } = Styles();

    useEffect(() => {
        if (accountProp) {
            setAccount(accountProp.number);
        }
        if (month) {
            const startDate = new Date(month);
            startDate.setDate(1); // 월초

            const endDate = new Date(month);
            endDate.setMonth(endDate.getMonth() + 1);
            endDate.setDate(0); // 월말

            setPeriod({ start: startDate.toISOString().substring(0, 10), end: endDate.toISOString().substring(0, 10) });
        }
    }, [month],);

    return (
        <>
            <form style={{ paddingTop: 5, borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}>
                <label style={labelStyle}>계좌번호</label>
                <select style={inputStyle} value={account} onChange={(e) => setAccount(e.target.value)}>
                    {/* 계좌번호 선택 */}
                </select>
                <br />
                <label style={labelStyle}>월별조회</label>
                <select style={inputStyle} value={month} onChange={(e) => setMonth(e.target.value)}>
                    {/* 월별조회 선택 */}
                </select>
                <br />
                <label style={labelStyle}>조회기간</label>
                <input style={inputStyle} type="date" value={period.start} readOnly /> {/* 조회기간 시작 */}
                ~
                <input type="date" value={period.end} readOnly /> {/* 조회기간 끝 */}
                <br />
            </form>
            <div style={{ marginTop: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <button style={buttonStyle} type="submit">조회</button>
            </div>
        </>
    );
}

SendHistory.propTypes = {
    account: PropTypes.object,
};

export default SendHistory;