

import React, { useState } from 'react';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login logic here
        console.log('Form Data:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;