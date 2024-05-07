function MyButton({ title, description, backgroundColor, onClick }) {
    return (
        <button className="buttonStyle" style={{ backgroundColor, marginRight: '40px' }} onClick={onClick}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ marginBottom: '35px' }}>{title}</div>
                <div style={{ fontWeight: '100', fontSize: '20.5px', wordWrap: 'break-word', textAlign: 'left' }}>{description}</div>
            </div>
        </button>
    );
}

export default MyButton;