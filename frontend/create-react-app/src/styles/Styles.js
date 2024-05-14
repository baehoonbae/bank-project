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


    const menuStyle = {
        cursor: 'pointer',
        fontSize: '18px',
        margin: 0,
        padding: '10px 0',
        backgroundColor: '#e0e0e0',
        maxWidth: '264px',
    };

    const selectedMenuStyle = {
        ...menuStyle,
        backgroundColor: '#b3b3b3', 
    };

    const selectedMenuNameStyle = {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '25px',
    }

    return ({ inputStyle, buttonStyle, menuStyle, selectedMenuStyle, selectedMenuNameStyle });
}

export default Styles;