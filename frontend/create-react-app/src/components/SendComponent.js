import React from 'react';
import PropTypes from 'prop-types';
import Styles from '../styles/Styles.js';

const SendComponent = ({ account }) => {
    const fields = [
        { label: '출금계좌번호', type: 'select', value: account },
        { label: '입금기관', type: 'select' },
        { label: '입금계좌번호', type: 'text' },
        { label: '이체금액', type: 'text' },
        { label: '계좌비밀번호', type: 'text' },
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
        marginLeft: '10px',
    };

    const { buttonStyle } = Styles();

    return (
        <>
            <form style={{ borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #f1f1f1' }}>
                {fields.map((field, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'flex-start', borderBottom: '1px solid #e0e0e0' }}>
                        <label style={labelStyle}>{field.label}</label>
                        {field.type === 'select' ? (
                            <select style={inputStyle} value={field.value || ''}></select>
                        ) : (
                            <input style={inputStyle} type="text" />
                        )}
                    </div>
                ))}
            </form>
            <div style={{ marginTop: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <button style={buttonStyle} type="submit">확인</button>
            </div>
        </>
    );
};

SendComponent.propTypes = {
    account: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default SendComponent;