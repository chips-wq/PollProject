

import React, { useContext, useState } from 'react';
import apiBase from "../../utils/constants";
import "./login.css"
import UserContext from '../../context/context';

const LoginForm = ({ closeModal }) => {
    const [user, setUser] = useContext(UserContext);
    const [errors, setErrors] = useState([]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const rawResponse = await fetch(`${apiBase}/login`, {
                method: 'POST',
                credentials: "include",
                headers: { "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const jsonResponse = await rawResponse.json();
            if (rawResponse.status === 200) {
                setUser(jsonResponse);
                closeModal();
            } else {
                if (jsonResponse.errors !== undefined) {
                    setErrors(jsonResponse.errors);
                }
            }
        } catch (e) {
            console.error("Error sending login request");
        }
    };

    return (
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Gmail"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='errors'>
                    {errors.map((error, id) => <p key={id}>{error}</p>)}
                </div>
                <button type="submit" className='form-button'>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;