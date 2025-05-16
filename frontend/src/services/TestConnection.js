import React, { useState } from 'react';

const SendMessage = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/test/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
            const data = await res.text();
            setResponse(data);
            console.log("Response from Spring Boot:", data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                />
                <button type="submit">Send Message</button>
            </form>
            {response && <p>Response from server: {response}</p>}
        </div>
    );
};

export default SendMessage;
