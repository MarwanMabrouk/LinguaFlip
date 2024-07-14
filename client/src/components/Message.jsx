import React, { useEffect } from 'react';

const Message = ({ message, isSuccess, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Display message for 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            borderRadius: '5px',
            color: '#fff',
            backgroundColor: isSuccess ? 'green' : 'red',
            zIndex: 1000,
        }}>
            {message}
        </div>
    );
};

export default Message;