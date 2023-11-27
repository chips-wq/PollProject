

import React, { useContext, useState } from 'react';
import apiBase from "../../utils/constants";
import "./login.css"
import UserContext from '../../context/context';

const RegisterForm = ({ closeModal }) => {

    const [user, setUser] = useContext(UserContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
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
        // Perform login logic here
        console.log('Form data', JSON.stringify(formData));
        try {
            const rawResponse = await fetch(`${apiBase}/register`, {
                method: 'POST',
                credentials: "include",
                headers: { "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const jsonResponse = await rawResponse.json();
            if (rawResponse.status === 200) {
                setUser(jsonResponse);
                closeModal();
            }
        } catch (e) {
            console.error("Error sending login request");
        }
    };

    return (
        <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Gmail"
                        value={formData.email}
                        onChange={handleInputChange}
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
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className='form-button'>Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;