import { useState, useContext } from 'react'

import hamburgerSvg from '../assets/hamburger.svg'
import logoSvg from '../assets/logo.svg'
import Modal from './Modal'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import UserContext from '../context/context'
import apiBase from '../utils/constants'

const logout = async (setUser) => {
    console.log("logout t");
    try {
        const rawResponse = await fetch(`${apiBase}/logout`, {
            method: 'POST',
            credentials: "include",
            headers: { "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" },
        });
        const jsonResponse = await rawResponse.json();
        setUser(null);
        //console.log(jsonResponse);
    } catch (e) {
        console.log("terribly failed", e);
    }
}
const Navbar = () => {
    const [navShowing, setNavShowing] = useState(false)
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);

    const [user, setUser] = useContext(UserContext);

    return (
        <nav className="navbar">
            <img src={logoSvg}></img>
            <div className='hamburger'>
                <img src={hamburgerSvg} width={30} onClick={() => setNavShowing(!navShowing)}></img>
                <ul className='dropdown' style={{ display: navShowing ? 'flex' : 'none' }}>
                    {user === null ? (
                        <>
                            <li onClick={() => setLoginModalOpen(true)}>Login</li>
                            <li onClick={() => setRegisterModalOpen(true)}>Register</li>
                        </>) : (
                        <>
                            <li onClick={() => logout(setUser)}>Logout</li>
                            <li onClick={() => console.log("poll")}>Create Poll</li>
                        </>
                    )}

                </ul>
            </div>
            <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
                <LoginForm closeModal={() => setLoginModalOpen(false)} />
            </Modal>
            <Modal isOpen={registerModalOpen} onClose={() => setRegisterModalOpen(false)}>
                <RegisterForm closeModal={() => setRegisterModalOpen(false)} />
            </Modal>
        </nav>
    );
}

export default Navbar;