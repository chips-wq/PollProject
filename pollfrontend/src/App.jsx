import './App.css'
import Navbar from './Components/Navbar'
import UserContext from './context/context'
import { useState } from 'react';

function App() {
    const [user, setUser] = useState(null);
    return (
        <>
            <UserContext.Provider value={[user, setUser]}>
                <Navbar></Navbar>
                <div>
                </div>
            </UserContext.Provider>
        </>
    )
}

export default App