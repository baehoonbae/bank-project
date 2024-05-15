import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Styles } from '../styles/Styles.js';

function SendHistory({ account: accountProp }) {
    const [accountNumber, setAccountNumber] = useState('');
    const [account, setAccount] = useState(""); // 계좌번호
    const [month, setMonth] = useState(""); // 월별조회
    const [period, setPeriod] = useState({ start: "", end: "" }); // 조회기간
    const fields = [
        { label: '계좌번호', type: 'select', value: account, onChange: setAccount },
        { label: '월별조회', type: 'select', value: month, onChange: setMonth },
        { label: '조회기간', type: 'date', value: period.start, readOnly: true },
    ];
    const labelStyle = {
        paddingTop: '17.5px',
        paddingBottom: '17.5px',
        backgroundColor: '#f1f1f1',
        paddingRight: '50px',
        width: '130px',
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
            <form style={{ borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}>
                {fields.map((field, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'flex-start', borderBottom: '1px solid #e0e0e0' }}>
                        <label style={labelStyle}>{field.label}</label>
                        {field.type === 'select' ? (
                            <select style={inputStyle} value={field.value || ''} onChange={(e) => field.onChange(e.target.value)}></select>
                        ) : (
                            <input style={inputStyle} type={field.type} value={field.value || ''} readOnly={field.readOnly || false} />
                        )}
                        <br />
                    </div>
                ))}
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