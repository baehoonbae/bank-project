export function Styles() {
    const inputStyle = {
        width: '300px',
        height: '40px',
        marginTop: '10px'
    };

    const buttonStyle = {
        ...inputStyle,
        backgroundColor: 'teal',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    return({ inputStyle, buttonStyle } );
}

export default Styles;