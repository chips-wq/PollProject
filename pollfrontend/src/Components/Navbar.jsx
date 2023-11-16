import { useState } from 'react'

import hamburgerSvg from '../assets/hamburger.svg'
import logoSvg from '../assets/logo.svg'
import Modal from './Modal'
import LoginForm from './LoginForm'
const Navbar = () => {
    const [navShowing, setNavShowing] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <nav className="navbar">
            <img src={logoSvg}></img>
            <div className='hamburger'>
                <img src={hamburgerSvg} width={30} onClick={() => setNavShowing(!navShowing)}></img>
                <ul className='dropdown' style={{ display: navShowing ? 'flex' : 'none' }}>
                    <li onClick={() => setModalOpen(true)}>Login</li>
                    <li>Register</li>
                </ul>
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <LoginForm />
                <div>test elements</div>
            </Modal>
        </nav>
    );
}

export default Navbar;