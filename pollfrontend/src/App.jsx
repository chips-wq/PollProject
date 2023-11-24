import './App.css'
import Navbar from './Components/Navbar'
import UserContext from './context/context'
import { useEffect, useState } from 'react';
import testoasaSvg from './assets/testoasa.svg'
import PollComponent from './Components/PollComponent';
import apiBase from './utils/constants';

function App() {
    const [user, setUser] = useState(null);
    const [polls, setPolls] = useState([]);

    const getPolls = async () => {
        const rawResponse = await fetch(`${apiBase}/polls`, {
            method: 'GET',
            // credentials: "include",
            // headers: { "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" },
            // body: JSON.stringify(formData)
        });
        const jsonResponse = await rawResponse.json();
        console.log(jsonResponse);
        setPolls(jsonResponse);
    }

    useEffect(() => {
        getPolls();
    }, []);
    return (
        <>
            <UserContext.Provider value={[user, setUser]}>
                <Navbar></Navbar>
                <div className='main-content'>
                    <div className='main-content-header'>
                        <p>Opiniile sunt mai importante ca niciodată. Platformele de sondaje permit organizatorilor să culeagă feedback direct de la audiența lor și să înțeleagă mai bine nevoile și dorințele acesteia.</p>
                        <img src={testoasaSvg} style={{ width: '160px' }} />
                    </div>
                    <div className='polls-container'>
                        {polls.length > 0 ?
                            polls.map(poll => (
                                <PollComponent question={poll.question} answers={poll.answers} />
                            )) : null}
                    </div>
                </div>
            </UserContext.Provider>
        </>
    )
}

export default App