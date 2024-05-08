function MyButton({ title, description, backgroundColor, onClick }) {
    return (
        <button className="button" style={{ backgroundColor, marginRight: '40px' }} onClick={onClick}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div className="title" style={{ marginBottom: '35px' }}>{title}</div>
                <div style={{ fontWeight: '100', fontSize: '20.5px', wordWrap: 'break-word', textAlign: 'left' }}>{description}</div>
            </div>
        </button>
    );
}

export default MyButton;